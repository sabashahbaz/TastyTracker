import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import SearchFood from './SearchFoodBar';

function FoodDashboard ({foodItems}) {

    return (
        <div className = "food_dashboard">
            <div className= "breakfast-container">
                <h2>Breakfast</h2>
                <Link to="/search_food"><button>Add Breakfast</button></Link>
                {/* <div>{foodItems}</div> */}
            </div>

        </div>
    )
}

export default FoodDashboard;