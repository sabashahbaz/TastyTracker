import React, {useEffect} from "react";
// import FoodLogForm from './FoodLogForm';
// import SearchFood from './SearchFoodBar';
import FoodLog from './FoodLog.js';
import Calories from './Calories.js'
import searchpage from "../CSS/searchpage.css"

function FoodLogPage ({setItems, setSearchedItems, setTotalCaloriesIAte, currentFoodResponse, items, setCurrentTdee, caloriesIAte, currentTdee, foodItem, setSelectedMeal, currentUser, setCurrentUser}) {

    useEffect(() => {
        fetch('/check_session')
        .then(response => {
            if(response.ok) {
                return response.json()
            }
        })
        .then(data => {
            console.log("LALALALA", data)
            console.log(data.user)
            setCurrentUser(data.user);
            setCurrentTdee(data.user.tdee);
            console.log("AAAAAAAAAAAAAAAAA",data.total_calories_eaten.total_daily_calories_eaten)
            setTotalCaloriesIAte(data.total_calories_eaten.total_daily_calories_eaten)
        });
    }, []);
        
return (
    
        <div>
            <div>
                {currentUser ? (
                    <Calories caloriesIAte={caloriesIAte}  currentTdee={ currentTdee}/>

                ): null}
            </div>
            <FoodLog setItems={setItems} setSearchedItems={setSearchedItems}currentTdee={currentTdee} items={items} setSelectedMeal={setSelectedMeal} setCurrentUser={setCurrentUser}foodItem={foodItem} currentFoodResponse={currentFoodResponse}/>
        </div> 
    )
}

export default FoodLogPage;