import React, {useState} from 'react';
import FoodItem from "./FoodItem";

function FoodItemsList({foodItems}) {

    console.log("hi from food items list", foodItems)
    // let foodItemsArr = foodItems.items

    return(
        <div>
            {foodItems.map((item) => (
                <FoodItem key={item.id} item={item} /> ))}
                <p>food list</p>
        </div>
    )
}

export default FoodItemsList;