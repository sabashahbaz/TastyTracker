import React from 'react';
import {Link} from 'react-router-dom';
import DisplayBreakfastItems from './DisplayBreakfastItems';
import DisplayLunchItems from "./DisplayLunchItems"
import DisplayDinnerItems from "./DisplayDinnerItems"
import DisplaySnackItems from "./DisplaySnackItems"


function FoodLog ({foodItem, currentTdee, setSelectedMeal}) {

return (

        <div className = "food-log">

            <div class="breakfast-card card border-light mb-3 d-flex aligns-items-center justify-content-center w-50 mx-auto" style={{ width: '18rem'}}>
                <h5 class="card-header">Breakfast</h5>
                <div class="card-body">
                    <p class="card-text">{Math.round(currentTdee * .20)} calories </p>
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
                    <Link to="/search_food"><button  type="button" class="btn btn-light btn-sm" onClick={() => setSelectedMeal("Breakfast")}>Add Breakfast</button></Link>
            </div>
            </div>

            <div class=" lunch-card card border-light primary mb-3 d-flex aligns-items-center justify-content-center w-50 mx-auto" style={{ width: '18rem' }}>
                <h5 class="card-header">Lunch</h5>
                <div class="card-body">
                    <p class="card-text">{Math.round(currentTdee * 0.25)} calories </p>
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
                    <Link to="/search_food"><button  type="button" class="btn btn-light btn-sm" onClick={() => setSelectedMeal("Lunch")}>Add Lunch</button></Link>
            </div>
            </div>

            <div class=" dinner-card card card border-light mb-3 d-flex aligns-items-center justify-content-center w-50 mx-auto" style={{ width: '18rem' }}>
                <h5 class="card-header">Dinner</h5>
                <div class="card-body">
                    <p class="card-text"> {Math.round(currentTdee * 0.35)} calories </p>
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
                <Link to="/search_food"><button  type="button" class="btn btn-light btn-sm" onClick={() => setSelectedMeal("Dinner")}>Add Dinner</button></Link>
            </div>
            </div>

            <div class=" snack-card card border-light mb-3 d-flex aligns-items-center justify-content-center w-50 mx-auto" style={{ width: '18rem' }}>
                <h5 class="card-header">Snack</h5>
                <div class="card-body">
                    <p class="card-text"> {Math.round(currentTdee * .20)} calories </p>
                    <div className = "snack-list">
                    {foodItem.map((item) => {
                                    if (item.meal_type == "Snack") {
                                        return (
                                            <DisplaySnackItems 
                                                key={item.id}
                                                item={item}
                                            />
                                        )}})}
                </div>
                <Link to="/search_food"><button  type="button" class="btn btn-light btn-sm" onClick={() => setSelectedMeal("Snack")}>Add Snack</button></Link>
            </div>
            </div>
            </div>
    )
}

export default FoodLog;
