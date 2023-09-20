import React, {useEffect} from "react";
// import FoodLogForm from './FoodLogForm';
// import SearchFood from './SearchFoodBar';
import FoodLog from './FoodLog.js';

function FoodLogPage ({setItems,setTotalCaloriesIAte, currentFoodResponse, items, setCurrentTdee, caloriesIAte, currentTdee, foodItem, setSelectedMeal, currentUser, setCurrentUser}) {

    useEffect(() => {
        fetch('/check_session')
        .then(response => {
            if(response.ok) {
                return response.json()
            }
        })
        .then(data => {
            // console.log("LALALALA", data)
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
                    <>
                    <div className="Tdee-display">
                        <h3> your current TDEE: {currentTdee}</h3>
                    </div>
                    <div className="calories-eaten-display">
                    <h3> calories I have eaten today: {caloriesIAte} </h3>
                    </div>
                    </>

                ): null}
            </div>
            <FoodLog setItems={setItems} currentTdee={currentTdee} items={items} setSelectedMeal={setSelectedMeal} setCurrentUser={setCurrentUser}foodItem={foodItem} currentFoodResponse={currentFoodResponse}/>
        </div> 
    )
}

export default FoodLogPage;