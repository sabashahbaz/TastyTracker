import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
// import "../CSS/FoodDashboard.css";
import DisplayBreakfastItems from './DisplayBreakfastItems';
import DisplayLunchItems from "./DisplayLunchItems"
import DisplayDinnerItems from "./DisplayDinnerItems"
import DisplaySnackItems from "./DisplaySnackItems"


function FoodDashboard ({foodItem, setCurrentUser, setSelectedMeal}) {

    return (
        <div className = "food_dashboard">
            <div className= "breakfast-container">
                <h2>Breakfast</h2>
                <Link to="/search_food"><button onClick={() => setSelectedMeal("Breakfast")}>Add Breakfast</button></Link>
                <div className = "breakfast-list">
                        {foodItem.map((item) => {
                            if (item.meal_type == "Breakfast") {
                                return (
                                    <DisplayBreakfastItems 
                                        key={item.id}
                                        item={item}
                                    />
                                )}})}
                </div>
            </div>
            <div className= "Lunch-container">
                <h2>Lunch</h2>
                <Link to="/search_food"><button onClick={() => setSelectedMeal("Lunch")}>Add Lunch</button></Link>
                <div className = "lunch-list">
                    {foodItem.map((item) => {
                                if (item.meal_type == "Lunch") {
                                    return (
                                        <DisplayLunchItems 
                                            key={item.id}
                                            item={item}
                                        />
                                    )}})}
                </div>
            </div>
            <div className= "dinner-container">
                <h2>Dinner</h2>
                <Link to="/search_food"><button onClick={() => setSelectedMeal("Dinner")}>Add Dinner</button></Link>
                <div className = "dinner-list">
                    {foodItem.map((item) => {
                                    if (item.meal_type == "Dinner") {
                                        return (
                                            <DisplayDinnerItems 
                                                key={item.id}
                                                item={item}
                                            />
                                        )}})}
                </div>
            </div>
            <div className= "snack-container">
                <h2>Snacks</h2>
                <Link to="/search_food"><button onClick={() => setSelectedMeal("Snack")}>Add Snacks</button></Link>
                <div className = "snack-list">
                    {foodItem.map((item) => {
                                        if (foodItem.meal_type == "Snack") {
                                            return (
                                                <DisplaySnackItems 
                                                    key={item.id}
                                                    item={item}
                                                />
                                            )}})}
                </div>
            </div>
            </div>
    )
}

export default FoodDashboard;
