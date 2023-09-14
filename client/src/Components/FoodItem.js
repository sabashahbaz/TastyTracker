import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

function FoodItem ({item, addToFoodList}) {
    const navigate = useNavigate()

    function handleClick(e) {
        addToFoodList(item)
        navigate("/")

    }

    console.log(item.name)
    return (
        <div className="food-item" onClick={(e) => handleClick(e)} >
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <p>Calories: {item.calories} grams</p>
        </div> 
    )
}

export default FoodItem;