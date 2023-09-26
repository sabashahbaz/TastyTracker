import React, {useEffect} from "react";
import FoodLog from './FoodLog.js';
import Calories from './Calories.js'
import CSS from "../CSS/searchpage.css"

function FoodLogPage ({ 
        setCurrentFoodLog,
        setTotalCaloriesIAte,  
        setCurrentTdee, 
        caloriesIAte, 
        currentTdee, 
        foodItem, 
        setSelectedMeal, 
        currentUser, 
        setFoodItem,
        setCurrentUser}) {

    //check user
    useEffect(() => {
        fetch('/check_session')
        .then(response => {
            if(response.ok) {
                return response.json()
            }
        })
        .then(data => {
            console.log("did it finally work?",data.items_associated)
            setCurrentUser(data.user); 
            setCurrentTdee(data.user.tdee); 
            setTotalCaloriesIAte(data.total_calories_eaten.total_daily_calories_eaten)
            setFoodItem(data.items_associated)
            // setCurrentFoodLog(data.total_calories_eaten.id)
        });
    }, []);
        
return (
        <div>
            <div>
                {currentUser ? (
                    <Calories caloriesIAte={caloriesIAte} currentTdee={ currentTdee}/>
                ): null}
            </div>
            <FoodLog 
            currentTdee={currentTdee} 
            setSelectedMeal={setSelectedMeal} 
            foodItem={foodItem} 
            />
        </div> 
    )
}

export default FoodLogPage;