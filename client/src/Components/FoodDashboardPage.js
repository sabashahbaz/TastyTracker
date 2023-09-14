import React, {useEffect} from "react";
// import FoodLogForm from './FoodLogForm';
// import SearchFood from './SearchFoodBar';
import FoodDashboard from './FoodDashboard';

function FoodDashBoardPage ({setItems, items, foodItem, setSelectedMeal, setCurrentUser}) {

// Because this is the home page //
useEffect(() => {
    fetch('/check_session')
    .then(response => {
        if(response.ok) {
        response.json()
        .then(user => setCurrentUser(user))
        }
    })
    }, [])
    
return (
    <>
        <p> food dashboard </p>
        <FoodDashboard setItems={setItems} items={items} setSelectedMeal={setSelectedMeal} setCurrentUser={setCurrentUser}foodItem={foodItem}/>
        {/* <div><FoodLogForm/> </div> */}
        {/* <div><SearchFood setFoodItems={setFoodItems}/></div> */}
    </>

    
    

)
}

export default FoodDashBoardPage;