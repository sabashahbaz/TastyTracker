from flask import Flask, make_response, jsonify, request, session
from flask_cors import CORS
import requests
import os
from models import db, Item, User, Current_Day_Log, Item_Current_Day_Log_Association, Recipe, User_Recipe_Association, Item_User_Association
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from datetime import date, timedelta

app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.secret_key = os.getenv("SECRET_KEY")

migrate = Migrate(app, db)
current_date = date.today()

db.init_app(app)

#check to current user, user TDEE, updated calories user ate, items user added to food log, and recipes user saved 
@app.get("/check_session")
def check_session():

    user_id = session.get("user_id")
    
    if user_id is None:
        return {"message": "No user logged in"}, 401

    user = User.query.filter(User.id == session.get("user_id")).first() #check user with current user.id 
    total_calories_eaten = Current_Day_Log.query.filter(Current_Day_Log.user_id == session.get("user_id")).filter(Current_Day_Log.date == current_date).first() #select the current day log 
    filtered_recipes = Recipe.query.filter(Recipe.user_id==session.get("user_id")).all() #select all the recpies saved by the current user
    
    if user:
        user_id = user.id  # Replace with the actual user ID

        # Query the specific Current_Day_Log for the current user and current date
        current_day_log = Current_Day_Log.query.filter(
            Current_Day_Log.user_id == session.get("user_id"),
            Current_Day_Log.date == current_date
        ).first()
        
        if current_day_log:
            # Retrieve all items associated with the specific Current_Day_Log
            items_associated = Item.query.join(Item_Current_Day_Log_Association).filter(
                Item_Current_Day_Log_Association.user_id == session.get("user_id"),
                Item_Current_Day_Log_Association.current_day_log_id == current_day_log.id
            ).all()

            #associate current user with current day log 


            return {
                "user": user.to_dict(),
                "total_calories_eaten": current_day_log.to_dict(),
                "items_associated": [item.to_dict() for item in items_associated],
                "saved_recipes": [recipe.to_dict() for recipe in filtered_recipes], 
            }, 200
        
    if user and total_calories_eaten:
        return {"user": user.to_dict(), "total_calories_eaten": total_calories_eaten.to_dict()}, 200
    else:
        return {"message": "No user logged in"}, 401

# create account + get TDEE
@app.post("/create_account")
def create_account():
    data = request.json
    
    #get the information from user input 
    weight = data.get("weight")
    height = data.get("height")
    age = data.get("age")
    gender = data.get("gender").lower()

    #make sure user entered correct data
    if weight <= 0 or height <= 0 or age <= 0:
        return jsonify({"error": "invalid user data"}), 400

    #calculate BMR based on gender
    if gender == "male":
        bmr = 66.47 + (6.24 * weight) + (12.7 * height) - (6.755 * age)

    elif gender == "female":
        bmr = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age)
    else:
        return jsonify({"error": "Invalid gender"})
    
    activity_level = data.get("activity_level")
    activity_levels = {1: 1.2, 2: 1.375, 3: 1.46, 4: 1.725, 5: 1.9}

    #calculate the activity level index, based on user activity level
    activity_level_index = activity_levels.get(activity_level)

    #user BMR and activity level index to calcualte daily_calories needed
    daily_calories_needed = int(bmr * activity_level_index)

    #password hash for save data storage
    password_hash = bcrypt.generate_password_hash(data["password"]).decode("utf-8")

    new_user = User(
                    first_name=data["first_name"],
                    last_name=data["last_name"],
                    username=data["username"],
                    password_hash=password_hash,
                    tdee= daily_calories_needed
                )
    
    db.session.add(new_user) #add to user database
    try:
        db.session.commit()  # Commit new_user to get an ID from the database
        session["user_id"] = new_user.id  # Assign the user_id to the session

        # Now create and add new_user_log with the correct user_id 
        new_user_log = Current_Day_Log(
            total_daily_calories_eaten="0",
            user_id=new_user.id,
            date = current_date
        )
    
        db.session.add(new_user_log)
        db.session.commit()  # Commit new_user_log

        return jsonify({"message": "Account created successfully", "user": new_user.to_dict()}), 201
    except Exception as e:  
        raise Exception("Adding a user failed")

# login
@app.post("/login")
def login():

    try: 
        data = request.json
        # print(user)
        user = User.query.filter(User.username == data["username"]).first() #check to see if username exists
        existing_food_log = Current_Day_Log.query.filter(Current_Day_Log.user_id == user.id).filter(Current_Day_Log.date == current_date).first() #check to see if there is a current user log
        #each day, a user will have a new current_day_log (food_log)

        if user and bcrypt.check_password_hash(user.password_hash, data["password"]) and existing_food_log:
            session["user_id"] = user.id
            return jsonify({"user": user.to_dict(), "new_day_calories":  existing_food_log.to_dict()}), 200
        
        else: 
            new_food_log = Current_Day_Log(user_id=user.id, date=current_date, total_daily_calories_eaten=0) #if user does not have a current day log, create a new one
            db.session.add(new_food_log)
            db.session.commit()
            existing_food_log = new_food_log  # Update existing_food_log

        #     user_log_association = User_Current_Log_Association(
        #     user_id = data.user.id,
        #     current_day_log_id = new_food_log.id
        # )
        #     db.session.add(user_log_association)
        #     db.session.commit()

        return jsonify({"user": user.to_dict(), "new_day_calories": new_food_log.to_dict()}), 200
    
    except Exception as e:
        print("Error:", e)
        return make_response(jsonify({"error": "invalid username or password"}), 400)
# logout
@app.delete("/logout")
def logout():
    session["user_id"] = None
    return {"message": "Logged out"}, 200

# GET food api request
def get_food_api(userInput):
    food_api_url = "https://api.nal.usda.gov/fdc/v1/foods/search"
    food_api_key = os.getenv("FOOD_ITEMS_API_KEY")

    parameters = {
        "query": {"query": userInput},
        "dataType": ["Foundation"],
        "pageSize": 25,
    }
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api_key": food_api_key,
    }

    food_response = requests.get(
        f"https://api.nal.usda.gov/fdc/v1/foods/search?query={userInput}&API_KEY={food_api_key}"
    )
    if food_response.status_code == 200:
        food_data = food_response.json()
        return food_data
    else:
        raise Exception("food api request failed")

# Search for food items to add to food log
@app.post("/search_food_items")
def search_food_items():
    requested_food_data = get_food_api(request.json["query"])

    arrayOfItems = []

    for item in requested_food_data["foods"]:
        name = item.get("description", "")
        description = item.get("ingredients", "")
        calories = None

        for nutrient in item.get("foodNutrients", []):
            if (
                nutrient.get("nutrientName", "") == "Energy"
                and nutrient.get("unitName", "") == "KCAL"
            ):
                calories = nutrient.get("value")
        arrayOfItems.append( 
            {"name": name, "description": description, "calories": calories} 
        ) 
    return jsonify({"items": arrayOfItems}), 200

# Add food items to food log  
@app.post("/add_to_food_list")
def post_item_to_food_list():

    requested_data = request.json 

    try:
        item = Item(
            name = requested_data["name"],
            description = requested_data["description"],
            calories = requested_data["calories"],
            meal_type = requested_data["meal_type"],
            user_id = requested_data["user_id"],
        )
        db.session.add(item)
        db.session.commit()

        user_item_association = Item_User_Association(
            user_id = requested_data["user_id"],
            item_id = item.id,
        )
        db.session.add(user_item_association)
        db.session.commit()
        

        #select the current_day_log for the current day, since 1 user can have multiple day logs
        current_log = Current_Day_Log.query.filter(Current_Day_Log.user_id == requested_data["user_id"], Current_Day_Log.date == current_date).first()

        if current_log: 
            item_log_associtation = Item_Current_Day_Log_Association(
                current_day_log_id = current_log.id,
                item_id = item.id,
                user_id = requested_data["user_id"] 
            )
            db.session.add(item_log_associtation) #add to association table 
            db.session.commit()
        
        return item.to_dict()
    
    except Exception as e:
        print("Error:", e)
        return make_response(jsonify({"error": "the backend is broken"}), 400)

#ADD calories eaten + UPDATE calories left 
@app.patch('/update_calories_eaten/<int:user_id>')
def update_calories_consumed(user_id:int):
    try:
        current_date_log = Current_Day_Log.query.filter(Current_Day_Log.user_id == session.get("user_id")).filter(Current_Day_Log.date == current_date).first()
        
        if not current_date_log: 
            return make_response(
                jsonify({'error': 'user not found'}),404)

        requested_data = request.get_json()
        
        if current_date_log:
            new_calories_eaten = current_date_log.total_daily_calories_eaten + requested_data["calories"]

            # Update the current log with the new total calories eaten
            current_date_log.total_daily_calories_eaten = new_calories_eaten
            
            db.session.commit()
            return jsonify(new_calories_eaten), 200
        
        else:
            return jsonify({"error": "User not found"}), 404
    
    except Exception as e:
        print("Error:", e)
        return make_response(jsonify({"error": "the backend is broken"}), 400)
    
#DELETE item
@app.delete('/delete_food_item/<int:item_id>')
def delete_food_item(item_id:int):

    try:
        item = Item.query.get(item_id)

        if item:
            # Calculate calories of the item before deletion
            deleted_item_calories = item.calories

            # Retrieve the associated Current_Day_Log
            current_log = Current_Day_Log.query.filter(Current_Day_Log.user_id == session.get("user_id")).filter(Current_Day_Log.date == current_date).first()

            if current_log:
                # Subtract the item's calories from total_daily_calories_eaten
                current_log.total_daily_calories_eaten -= deleted_item_calories

                db.session.commit()

                db.session.delete(item)
                db.session.commit()

                return {"message": "Food item deleted successfully"}, 200
            else:
                return {"message": "Current Day Log not found"}, 404
        else:
            return {"message": "Food item not found"}, 404
    except Exception as e:
        print("Error:", e)
        return make_response(jsonify({"error": "The backend is broken"}), 500)

#GET Recipes from Tasty Api
def get_recipes_from_api(userInput):        

    url = "https://tasty.p.rapidapi.com/recipes/list"
    recipe_api_key = os.getenv("RECIPE_API")

    querystring = {"from":"0","size":"40","q":userInput}

    headers = {
        "X-RapidAPI-Key": recipe_api_key,
        "X-RapidAPI-Host": "tasty.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    print(response.status_code)

    if response.status_code == 200:
        recipe_data = response.json()
        return recipe_data
    else:
        raise Exception("recipe api request failed")

#search for recipes
@app.get('/search_recipes/<string:userInput>')
def search_recipe(userInput: str):

    requested_recipe_data = get_recipes_from_api(userInput)
    array_of_recipes = []

    for recipe in requested_recipe_data["results"]:
        name = recipe.get("name", "")
        image = recipe.get("thumbnail_url", "")
        description = recipe.get("description", "")

        instructions = []
        for instruction in recipe.get("instructions", []):
            
            display_text = instruction.get("display_text",   "")
            instructions.append(display_text)
            instructions_text = "\n".join(instructions)
    
        array_of_recipes.append(
            {"name": name, "image": image, "description":description, "instructions": instructions_text,}
        )

    return jsonify(array_of_recipes), 200

#Add saved recipe 
@app.post('/post_selected_recipe')
def post_selected_recipe():
    requested_data = request.json

    try:
        recipe = Recipe (
            name = requested_data["name"],
            image_url = requested_data["image"],
            description = requested_data["description"],
            recipe_meal_type = requested_data["selectedRecipeMeal"],
            user_id = requested_data["user_id"],
        )

        db.session.add(recipe)
        db.session.commit()

        user_recipe_association = User_Recipe_Association(
            user_id = requested_data["user_id"],
            recipe_id = recipe.id,
        )

        db.session.add(user_recipe_association)
        db.session.commit()

        return recipe.to_dict()
        
    except Exception as e:
        print("Error:", e)
        return make_response(jsonify({"error": "function post_selected_recipe is broken"}), 400)

@app.route("/")
def index():
    return "TastyTracker"

if __name__ == "__main__":
    app.run(port=5555, debug=True)


