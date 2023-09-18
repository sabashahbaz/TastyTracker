import React, {useEffect} from "react";
// import FoodLogForm from './FoodLogForm';
// import SearchFood from './SearchFoodBar';
import FoodDashboard from './FoodDashboard';

function FoodDashBoardPage ({setItems, items, setCurrentTdee, caloriesIAte, currentTdee, foodItem, setSelectedMeal, currentUser, setCurrentUser}) {

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
            <FoodDashboard setItems={setItems} items={items} setSelectedMeal={setSelectedMeal} setCurrentUser={setCurrentUser}foodItem={foodItem}/>
        </div> 
    )
}

export default FoodDashBoardPage;