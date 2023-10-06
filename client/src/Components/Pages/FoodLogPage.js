import React, {useEffect} from "react";
import FoodLog from '../FoodLogComponents/FoodLog.js';
import Calories from '../FoodLogComponents/Calories.js'
import ProgressBar from "../FoodLogComponents/ProgressBar.js";
import CSS from "../../CSS/foodlogpage.css"

//food log page, user can log food here
function FoodLogPage ({ 
        setTotalCaloriesIAte,  
        setCurrentTdee, 
        caloriesIAte, 
        currentTdee, 
        foodItem, 
        setSelectedMeal, 
        currentUser, 
        setFoodItem,
        setCurrentUser}) {

    //check user, tdee, updated total calories eaten and items from saved database
    useEffect(() => {
        fetch('/check_session')
        .then(response => {
            if(response.ok) {
                return response.json()
            }
        })
        .then(data => {
            setCurrentUser(data.user); 
            setCurrentTdee(data.user.tdee); 
            setTotalCaloriesIAte(data.total_calories_eaten.total_daily_calories_eaten)
            setFoodItem(data.items_associated)
        });
    }, []);
        
return (
    <div className = "food-log-bg">
        <div className="food-log-container">
            <ProgressBar caloriesIAte={caloriesIAte} currentTdee={ currentTdee}/>
            <div>
                <Calories caloriesIAte={caloriesIAte} currentTdee={ currentTdee}/> 
            </div>
            <FoodLog 
            currentTdee={currentTdee} 
            setSelectedMeal={setSelectedMeal} 
            foodItem={foodItem} 
            />
        </div> 
    </div>
    )
}

export default FoodLogPage;