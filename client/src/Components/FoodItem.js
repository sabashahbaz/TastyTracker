import React from 'react';

function FoodItem ({item}) {
    return (
        <div className="food-item">
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <p>Calories: {item.calories}</p>
        </div> 
    )
}

export default FoodItem;