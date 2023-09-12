import React from 'react';
import FoodItem from "./FoodItem";

function FoodItemsList({items,addToFoodList}) {

    // console.log("hi from food items list", items)

    return(
        <div>
            {items.map((item) => (
                <FoodItem key={item.id} item={item} addToFoodList={addToFoodList}/> ))}
                <p>food list</p>
        </div>
    )
}

export default FoodItemsList;