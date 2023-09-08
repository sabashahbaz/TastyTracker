import React, {useState} from "react";
import FoodLogForm from './FoodLogForm';
import SearchFood from './SearchFood';

function foodLogger ({setFoodItems}) {

return (
    <>
        <p> log food here</p>
        <div><FoodLogForm/> </div>
        <div><SearchFood setFoodItems={setFoodItems}/></div>
    </>

    
    

)
}

export default foodLogger;