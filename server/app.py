from flask import Flask, make_response, jsonify, request, session
from flask_cors import CORS
import requests
# import psycopg2
import os
from models import db, Item, User, Current_Day_Log, Item_Current_Day_Log_Association
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from datetime import date, timedelta
from sqlalchemy import Date, cast
today = date.today()

app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/app.db'

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.secret_key = os.getenv("SECRET_KEY")

migrate = Migrate(app, db)
current_date = date.today()

tomorrow = current_date + timedelta(1)
db.init_app(app)

@app.get("/check_session")
def check_session():
    user = User.query.filter(User.id == session.get("user_id")).first()
    total_calories_eaten = Current_Day_Log.query.filter(Current_Day_Log.user_id == session.get("user_id")).filter(Current_Day_Log.date == current_date).first()

    print(total_calories_eaten)


    if user:
        user_id = user.id  # Replace with the actual user ID

        # Query the specific Current_Day_Log for the user and the current date
        current_day_log = Current_Day_Log.query.filter(
            Current_Day_Log.user_id == user_id,
            Current_Day_Log.date == current_date
        ).first()

        if current_day_log:
            # Retrieve all items associated with the specific Current_Day_Log
            items_associated = Item.query.join(Item_Current_Day_Log_Association).filter(
                Item_Current_Day_Log_Association.user_id == user_id,
                Item_Current_Day_Log_Association.current_day_log_id == current_day_log.id
            ).all()

            return {
                "user": user.to_dict(),
                "total_calories_eaten": current_day_log.to_dict(),
                "items_associated": [item.to_dict() for item in items_associated]
            }, 200
    if user and total_calories_eaten:
        return {"user": user.to_dict(), "total_calories_eaten": total_calories_eaten.to_dict()}, 200
    else:
        return {"message": "No user logged in"}, 401


# create account + get TDEE
@app.post("/create_account")
def create_account():
    data = request.json

    weight = data.get("weight")
    height = data.get("height")
    age = data.get("age")
    gender = data.get("gender").lower()

    activity_levels = {1: 1.2, 2: 1.375, 3: 1.46, 4: 1.725, 5: 1.9}

    if weight <= 0 or height <= 0 or age <= 0:
        return jsonify({"error": "invalid user data"}), 400

    if gender == "male":
        bmr = 66.47 + (6.24 * weight) + (12.7 * height) - (6.755 * age)

    elif gender == "female":
        bmr = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age)
    else:
        return jsonify({"error": "Invalid gender"})
    
    activity_level = data.get("activity_level")

    activity_level_index = activity_levels.get(activity_level)

    daily_calories_needed = int(bmr * activity_level_index)

    password_hash = bcrypt.generate_password_hash(data["password"]).decode("utf-8")

    new_user = User(
                    first_name=data["first_name"],
                    last_name=data["last_name"],
                    username=data["username"],
                    password_hash=password_hash,
                    tdee= daily_calories_needed
                )
    
    db.session.add(new_user)
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
    data = request.json
    user = User.query.filter(User.username == data["username"]).first() 

    if user and bcrypt.check_password_hash(user.password_hash, data["password"]):
        session["user_id"] = user.id
        print("current day log", Current_Day_Log)
        existing_food_log = Current_Day_Log.query.filter(Current_Day_Log.user_id == Current_Day_Log.user_id).filter(Current_Day_Log.date == current_date).first()
        print("what is happening", user, existing_food_log)
        return jsonify({"user": user.to_dict(), "new_day_calories":  existing_food_log.to_dict()}), 200
    
    if not existing_food_log:
        new_food_log = Current_Day_Log(user_id=user.id, date=current_date,  total_daily_calories_eaten=0 )
        db.session.add(new_food_log)
        db.session.commit()
        print("new_food_log",new_food_log.total_daily_calories_eaten )
        return jsonify({"user": user.to_dict(), "new_day_calories":  new_food_log.to_dict()}), 200

    else:
        return {"error": "invalid username or password"}, 401

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
        "dataType": ["SR Legacy"],
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
    print(food_response.status_code)
    if food_response.status_code == 200:
        food_data = food_response.json()
        return food_data
    else:
        raise Exception("food api request failed")

# POST search
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

# POST to food list
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
        print("why is post broken")


        current_log = Current_Day_Log.query.filter(Current_Day_Log.user_id == requested_data["user_id"]).first()
        if current_log:
            item_log_associtation = Item_Current_Day_Log_Association(
                current_day_log_id = current_log.id,
                item_id = item.id,
                user_id = requested_data["user_id"] 
            )
            print("did it go through here", )
            db.session.add(item_log_associtation)
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
    
#ADD to item and current day log association table 
# @app.post('/add_to_user_log_association_table/<int:user_id>')
# def update_item_log_assocation_table(user_id:int):
#     try:





@app.route("/")
def index():
    return "TastyTracker"

# if __name__ == "__main__":
#     app.run()

if __name__ == "__main__":
    app.run(port=5555, debug=True)


