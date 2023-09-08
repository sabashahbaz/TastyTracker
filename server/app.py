from flask import Flask, make_response, jsonify, request, session
from flask_cors import CORS
import requests
import pandas 
import sqlalchemy 
import os 
import json


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

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


#
























        
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
    

@app.route('/')
def index():
    return "TastyTracker"

if __name__ == '__main__':
    app.run(port=5555, debug=True)

# def search_food_item():








































# # @app.route('/calculate_tdee', methods=['POST'])

# def bmr_calculator():
#     weight = int(input("weight: "))
#     height = int(input("Height in inches:  "))
#     age = int(input("Age:  "))
#     gender = input ("Are you a male or female").lower()

#     if gender == "m":
#         bmr = 66.47 + (6.24 * weight_in_lbs) + (12.7 * height_in_inches) - (6.755 * age)

#     elif gender == "f":
#         bmr = 655.1 + (4.35 * weight_in_lbs) + (4.7 * height_in_inches) - (4.7 * age)
#     print("Your Basal Metabolic Rate is" + str(bmr) + ".")
#     return bmr

# def daily_caloric_needs(bmr):
#     print(
#         '''
#         1 = Sedentary
#         2 = Exercise 1 - 3 times a week
#         3 = Exercise 4 - 5 times a week 
#         4 = Daily Exercise of intense exercise 3-4 times a week 
#         5 = Intense Exercise 6 times a week
#         ''' 
#     )

#     activityLevel = int(input("Select your activity level:  "))
#     if activityLevel == 1:
#         activityLevelIndex = 1.2
#     elif activityLevel == 2:
#         activityLevelIndex = 1.375
#     elif activityLevel == 3:
#         activityLevelIndex = 1.46
#     elif activityLevel == 4:
#         activityLevelIndex = 1.725
#     elif activityLevel == 5:
#         activityLevelIndex = 1.9

#     daily_calories_needed = int(bmr * activityLevelIndex)
#     print("To maintain your current weight you need" + str(daily_calories_needed) + "calories a day.")
#     return daily_calories_needed
    
#     lose_half_pound_week = int(calories - int((3500/2) /7))
#     print("To lose .5 lb of fat a week, your daily caloric needs drop to" + str(lose_half_pound_week) + ".")

# Helper function to define correct URL for parsing user input and pinging API
# def __get_request_url_with_populated_terms(userInput: str):
#     BASE_URL = "https://api.edamam.com/api/nutrition-data"
#     TERM_APP_ID = "enter-id-here"
#     TERM_APP_KEY = "enter-app-key-here"
#     TERM_NUTRITION_TYPE = "logging"
#     TERM_INGREDIENT = userInput
#     return f"{BASE_URL}?app_id={TERM_APP_ID}&app_key={TERM_APP_KEY}&nutrition_type={TERM_NUTRITION_TYPE}&ingr={TERM_INGREDIENT}"

# #GET data for calorie counter
# @app.route('/search_food_item')
# def get_data_for_calorie_calculator(userInput):
#     key = os.getenv('CALORIE_COUNTER_API_KEY')
#     url =  __get_request_url_with_populated_terms(userInput)
#     # querystring = {"query":userInput, "domain":"com"}
#     headers = {
#         "Content-Type": "application/json",
#         "Content-Encoding": "gzip",
#     }

#     food_response = requests.get(url, headers=headers)
#     if food_response.status_code == 200:
#         data=food_response.json()
#         return data
#     else: 
#         raise Exception("Calorie Counter api failed")