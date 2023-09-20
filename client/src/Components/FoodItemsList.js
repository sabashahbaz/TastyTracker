import React from 'react';
import FoodItem from "./FoodItem";
import searchpage from "../CSS/searchpage.css"

function FoodItemsList({searchedItems, foodItem, selectedMeal,setFoodItem, setTotalCaloriesIAte, currentUser, addToFoodList, currentFoodResponse}) {

    // console.log(foodItem)
    return(
        <div>
            {searchedItems.map((item) => (
                <FoodItem key={item.id} item={item} setFoodItem={setFoodItem} foodItem={foodItem} selectedMeal= {selectedMeal} addToFoodList={addToFoodList} currentUser={currentUser} currentFoodResponse={currentFoodResponse} setTotalCaloriesIAte={setTotalCaloriesIAte}/> ))}
        </div>
    )
}

export default FoodItemsList;