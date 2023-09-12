import React from 'react';
import {Link} from 'react-router-dom';
// import SearchFood from './SearchFoodBar';

function FoodDashboard ({setSelectedMeal}) {

    // const [selectedMeal, setSelectedMeal] = useState("")

    return (
        <div className = "food_dashboard">
            <div className= "breakfast-container">
                <h2>Breakfast</h2>
                <Link to="/search_food"><button onClick={() => setSelectedMeal("Breakfast")}>Add Breakfast</button></Link>
            </div>
            <div className= "Lunch-container">
                <h2>Lunch</h2>
                <Link to="/search_food"><button onClick={() => setSelectedMeal("Lunch")}>Add Lunch</button></Link>
            </div>
            <div className= "dinner-container">
                <h2>Dinner</h2>
                <Link to="/search_food"><button onClick={() => setSelectedMeal("Dinner")}>Add Dinner</button></Link>
            </div>
            <div className= "snack-container">
                <h2>Snacks</h2>
                <Link to="/search_food"><button onClick={() => setSelectedMeal("Snack")}>Add Snacks</button></Link>
            </div>


        </div>
    )
}

export default FoodDashboard;