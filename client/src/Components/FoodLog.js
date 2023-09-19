import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
// import "../CSS/FoodDashboard.css";
import DisplayBreakfastItems from './DisplayBreakfastItems';
import DisplayLunchItems from "./DisplayLunchItems"
import DisplayDinnerItems from "./DisplayDinnerItems"
import DisplaySnackItems from "./DisplaySnackItems"


function FoodLog ({foodItem, setSelectedMeal}) {

    console.log("Hey from fooditems list", foodItem)
    console.log("heyyyyyyyyyyy :) ")

    return (

        <div className = "food-log">
            <div class="card border-light mb-3 d-flex aligns-items-center justify-content-center w-50 mx-auto" style={{ width: '18rem' }}>
                <h5 class="card-header">Breakfast</h5>
                <div class="card-body">
                    {/* <h5 class="card-title">Breakfast</h5> */}
                    <p class="card-text">calories </p>
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
            </div>
            {/* <div className= "Lunch-container">
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
            </div> */}
            </div>
    )
}

export default FoodLog;
