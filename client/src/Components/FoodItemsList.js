import React from 'react';
import FoodItem from "./FoodItem";
import searchpage from "../CSS/searchpage.css"
 
function FoodItemsList({searchedItems, setSearchedItems, foodItem, selectedMeal,setFoodItem, setTotalCaloriesIAte, currentUser, addToFoodList, currentFoodResponse}) {

    
    // console.log(foodItem)
    return(
        <div className="search-list-container-map">
            {searchedItems.map((item) => (
                <FoodItem key={item.id} item={item} setFoodItem={setFoodItem} foodItem={foodItem} selectedMeal= {selectedMeal} addToFoodList={addToFoodList} currentUser={currentUser} currentFoodResponse={currentFoodResponse} setTotalCaloriesIAte={setTotalCaloriesIAte} setSearchedItems={setSearchedItems}/> ))}
        </div>



    //    <div>

    //     <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" class="scrollspy-example" tabindex="0">
    //         <div className="search-list-container-map" id="scrollspyHeading1">
    //            {searchedItems.map((item) => (
    //                 <FoodItem key={item.id} item={item} setFoodItem={setFoodItem} foodItem={foodItem} selectedMeal= {selectedMeal} addToFoodList={addToFoodList} currentUser={currentUser} currentFoodResponse={currentFoodResponse} setTotalCaloriesIAte={setTotalCaloriesIAte}/> ))}
    //         </div>
    //     </div>

    //    </div> 
    )     
}

export default FoodItemsList;