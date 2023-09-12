import React from 'react';

function FoodItem ({item, addToFoodList}) {

    function handleClick(e) {
        addToFoodList(item)
    }
    return (
        <div className="food-item" onClick={(e) => handleClick(e)} >
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <p>Calories: {item.calories} grams</p>
        </div> 
    )
}

export default FoodItem;