import React from "react";
// import FoodLogForm from './FoodLogForm';
// import SearchFood from './SearchFoodBar';
import FoodDashboard from './FoodDashboard';

function FoodDashBoardPage ({setItems, items, foodItem, setSelectedMeal}) {

return (
    <>
        <p> food dashboard </p>
        <FoodDashboard setItems={setItems} items={items} setSelectedMeal={setSelectedMeal} foodItem={foodItem}/>
        {/* <div><FoodLogForm/> </div> */}
        {/* <div><SearchFood setFoodItems={setFoodItems}/></div> */}
    </>

    
    

)
}

export default FoodDashBoardPage;