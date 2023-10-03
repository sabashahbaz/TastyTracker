import React from 'react';
import {Link} from 'react-router-dom';
import DisplayFoodItems from './DisplayFoodItems';

function FoodLog ({foodItem, currentTdee, setSelectedMeal}) {

    console.log("please lord help me bc i can't do this anymore", foodItem)
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
                                        <DisplayFoodItems
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
                                        <DisplayFoodItems
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
                                            <DisplayFoodItems
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
                                            <DisplayFoodItems
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
