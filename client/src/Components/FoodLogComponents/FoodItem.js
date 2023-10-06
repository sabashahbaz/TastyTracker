import React from 'react';
import {useNavigate} from 'react-router-dom';
import CSS from "../../CSS/searchpage.css"

function FoodItem ({item, 
    selectedMeal, 
    setSearchedItems, 
    setFoodItem, currentUser, 
    foodItem, 
    currentFoodLog,
    setTotalCaloriesIAte}) {
    
    const navigate = useNavigate()
    
    //adding the selected item + updating the calories user ate 
    function postDataAndPatchData() {
        fetch('/add_to_food_list', {
            method: 'POST',
            headers: {
                "Content-Type": "application/JSON",
            },
            body: JSON.stringify({
                "name": item.name, 
                "description": item.description,
                "calories": item.calories,
                "meal_type": selectedMeal,
                "user_id": currentUser.user.user_id,
                "current_day_log_id": currentFoodLog
            })
        })
            .then(response => response.json())
            .then(data =>{
                // console.log("something new everyday", data)
                setFoodItem([...foodItem, data])})
                
        fetch(`/update_calories_eaten/${currentUser.user.user_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "calories": item.calories,
            })
        })  
            .then(response => response.json())
            .then(data => {
                setTotalCaloriesIAte(data)
                setSearchedItems([])
                // console.log(data)
            })
            .then(data=> console.log(data))
            .then(navigate('/food_log'))
};

    //Searched items 
    return (
        <div className="searched-items-container"  class= "list-group justify" onClick={(e) => postDataAndPatchData(e)} >
            <div className="search-list">
            <ul class="the-searched-items">
                <b class ="fs-4">{item.name}</b>
                <br></br>
                <small className="food-calories">Calories: {item.calories} calories</small>
                <br></br>
                <small>{item.description}</small>
                
            </ul>
        
            </div>
        </div>    
    )
}

export default FoodItem;
