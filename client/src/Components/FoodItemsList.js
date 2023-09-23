import React from 'react';
import FoodItem from "./FoodItem";
import CSS from "../CSS/searchpage.css"
 
function FoodItemsList({
    searchedItems, 
    setSearchedItems, 
    foodItem, 
    selectedMeal,
    setFoodItem, 
    setTotalCaloriesIAte, 
    currentUser, 
    currentFoodResponse}) {


    //the searched food items 
    return(
        <div className="search-list-container-map"> 
            {searchedItems.map((item) => (
                <FoodItem key={item.id}  
                item={item} 
                setFoodItem={setFoodItem} 
                foodItem={foodItem} 
                selectedMeal= {selectedMeal} 
                currentUser={currentUser} 
                currentFoodResponse={currentFoodResponse} 
                setTotalCaloriesIAte={setTotalCaloriesIAte} 
                setSearchedItems={setSearchedItems}/> ))}
        </div>
    )     
}

export default FoodItemsList;