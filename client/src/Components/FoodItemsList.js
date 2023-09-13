import React from 'react';
import FoodItem from "./FoodItem";

function FoodItemsList({searchedItems,addToFoodList}) {

    // console.log("hi from food items list", items)

    return(
        <div>
            {searchedItems.map((item) => (
                <FoodItem key={item.id} item={item} addToFoodList={addToFoodList}/> ))}
        </div>
    )
}

export default FoodItemsList;