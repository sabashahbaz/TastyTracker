import React, {useState} from "react";
import FoodLogForm from './FoodLogForm';
import SearchFood from './SearchFoodBar';
import FoodDashboard from './FoodDashboard';

function FoodDashBoardPage ({setFoodItems, foodItems}) {

return (
    <>
        <p> food dashboard </p>
        <FoodDashboard setFoodItems={setFoodItems} foodItems={foodItems}/>
        {/* <div><FoodLogForm/> </div> */}
        {/* <div><SearchFood setFoodItems={setFoodItems}/></div> */}
    </>

    
    

)
}

export default FoodDashBoardPage;