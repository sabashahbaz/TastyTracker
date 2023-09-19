import React, {useEffect} from "react";
// import FoodLogForm from './FoodLogForm';
// import SearchFood from './SearchFoodBar';
import FoodLog from './FoodLog.js';

function FoodLogPage ({setItems, currentFoodResponse, items, setCurrentTdee, caloriesIAte, currentTdee, foodItem, setSelectedMeal, currentUser, setCurrentUser}) {

    console.log( "hey fron the food dashboard page", foodItem)
    console.log("sbababaabababab")

    useEffect(() => {
        fetch('/check_session')
        .then(response => {
            if(response.ok) {
                response.json()
                .then(user => {
                    setCurrentUser(user);
                    setCurrentTdee(user.tdee);
                });
            }
        })
    }, []);
        
return (
    
        <div>
            <div>
                {currentUser ? (
                    <>
                        <h2> current TDEE is {currentTdee}</h2>
                        <h2> Calories I have eaten today {caloriesIAte} </h2>
                    </>

                ): null}
            </div>
            <FoodLog setItems={setItems} items={items} setSelectedMeal={setSelectedMeal} setCurrentUser={setCurrentUser}foodItem={foodItem} currentFoodResponse={currentFoodResponse}/>
        </div> 
    )
}

export default FoodLogPage;