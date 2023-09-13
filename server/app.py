from flask import Flask, make_response, jsonify, request, session
from flask_cors import CORS
import requests
import os 
from models import db, Item, Item_User_Association, User
import json
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt


app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.secret_key = os.getenv('SECRET_KEY')

migrate = Migrate(app, db)

db.init_app(app)

#global variable 
total_calories_consumed = 0 

@app.get('/check_session')
def check_session():
    user = User.query.filter(User.id == session.get('user_id')).first()
    if user:
        return user.to_dict(), 200
    else: 
        return {"message": "No user logged in"}, 401

#create account
@app.post('/create_account')
def create_account():
    data = request.json
    password_hash = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    new_user = User (
        username=data["username"],
        password_hash=password_hash
    )
    session["user_id"] = new_user.id

    db.session.add(new_user)
    db.session.commit()
    return new_user.to_dict(), 201

#login 
@app.post('/login')
def login():
    data = request.json
    user = User.query.filter(User.username == data['username']).first()

    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        session["user_id"] = user.id
        return user.to_dict(), 200
    else:
        return{"error": "invalid username or password"}, 401

#logout 
@app.delete('/logout')
def logout():
    session['user_id'] = None
    return {"message": "Logged out"}, 200

#TDEE calculator 
@app.post('/calculate_tdee')
def calculate_tdee():
    print("this script is being mean")
    user_data = request.json


    weight = user_data.get('weight')
    height = user_data.get('height') 
    age = user_data.get('age')
    gender = user_data.get('gender').lower()

    activity_levels = {
        1: 1.2,
        2: 1.375,
        3: 1.46,
        4: 1.725,
        5: 1.9
    }

    if weight <=0 or height <=0 or age <=0:
        return jsonify({"error": "invalid user data"}), 400
    
    if gender == "male":
        bmr = 66.47 + (6.24 * weight) + (12.7 * height) - (6.755 * age)
    
    elif gender == "female":
        bmr = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age)
    else: 
        return jsonify({"error": "Invalid gender"})
    
    # activity_level = user_data.get('activity_level')
    activity_level = user_data.get('activity_level')

    activity_level_index = activity_levels.get(activity_level)

    daily_calories_needed = int(bmr * activity_level_index)

    response_data = {
        "bmr" : bmr, 
        "daily_calories_needed": daily_calories_needed
    }

    return (jsonify(response_data))
    
#GET food api request 
def get_food_api(userInput):
    food_api_url = "https://api.nal.usda.gov/fdc/v1/foods/search"
    food_api_key = os.getenv('FOOD_ITEMS_API_KEY')

    parameters = {
    "query": { "query":userInput },
    "dataType": ["SR Legacy"],
    "pageSize": 25
}
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api_key":  food_api_key
    }
    
    # food_response = requests.get(food_api_url, headers=headers, params=parameters)
    food_response = requests.get(f"https://api.nal.usda.gov/fdc/v1/foods/search?query={userInput}&API_KEY={food_api_key}")
    print(food_response.status_code)
    if food_response.status_code == 200:
        food_data = food_response.json()
        return food_data
    else:
        raise Exception("food api request failed")

#POST search 
@app.post('/search_food_items')
def search_food_items():
    print('post')
    
    requested_food_data = get_food_api(request.json["query"])

    arrayOfItems = []

    for item in requested_food_data["foods"]:
        name = item.get("description", "")
        description = item.get("ingredients", "")
        calories = None

        for nutrient in item.get("foodNutrients", []):
            if nutrient.get("nutrientName", "") == "Energy" and nutrient.get("unitName", "") == "KCAL":
                calories = nutrient.get("value")

        arrayOfItems.append({
            "name": name,
            "description": description,
            "calories": calories
        })


    return jsonify({"items": arrayOfItems}), 200

# POST to food list
@app.post('/add_to_food_list')
def post_item_to_food_list():
    global total_calories_consumed = 0
    # print("hey form backend")
    requested_data = request.json #get the jsonified requested data 
    try:
        # items = []
        # print("hey after []")
        # for data in requested_data: 
        # print("hey after data")
        item = Item(
            name = requested_data["name"],
            description = requested_data["description"],
            calories = requested_data["calories"],
            meal_type = requested_data["meal_type"],
            # user_id = data["user_id"]
        )
        # print("from backend")
        print(item)
        db.session.add(item)
            # items.append(item.to_dict())
        db.session.commit()

        total_calories_consumed += item.calories #adding
        # print("whooooooo")
        # print(item.to_dict())
        return item.to_dict(), 200
    except: 
        return make_response(jsonify({"error": "the backend is broken"}), 400)
    
    #curl -X POST -H "Content-Type: application/json" -d '{"user_id": "1", "item_id": "1", "meal_type": "breakfast"}' localhost:5555/books


@app.route('/')
def index():
    return "TastyTracker"

if __name__ == '__main__':
    app.run(port=5555, debug=True)

