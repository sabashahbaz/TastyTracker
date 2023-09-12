import React, {useState} from 'react';
import {Link} from 'react-router-dom';
// import SearchFood from './SearchFoodBar';

function FoodDashboard ({foodList}) {

    const [selectedMeal, setSelectedMeal] = useState("")
    const [breakfastList, setBreakfastList] = useState([])
    const [lunchList, setLunchList] = useState([])
    const [dinnerList, setDinnerList] = useState([])
    const [snackList, setSnackList] = useState([])
    
    function addFoodUnderCorrectSection() {
        if (selectedMeal === "Breakfast") {
            breakfastList.push(foodList);
        } else if (selectedMeal === "Lunch") {
            lunchList.push(foodList);
        } else if (selectedMeal === "Dinner") {
            dinnerList.push(foodList);
        } else if (selectedMeal === "Snack") {
            snackList.push(foodList);
        }
    }

    return (
        <div className = "food_dashboard">
            <div className= "breakfast-container">
                <h2>Breakfast</h2>
                <Link to="/search_food"><button onClick={() => setSelectedMeal("Breakfast")}>Add Breakfast</button></Link>
                <div className = "breakfast-list"></div>
            </div>
            <div className= "Lunch-container">
                <h2>Lunch</h2>
                <Link to="/search_food"><button onClick={() => setSelectedMeal("Lunch")}>Add Lunch</button></Link>
                <div className = "lunch-list"></div>
            </div>
            <div className= "dinner-container">
                <h2>Dinner</h2>
                <Link to="/search_food"><button onClick={() => setSelectedMeal("Dinner")}>Add Dinner</button></Link>
                <div className = "dinner-list"></div>
            </div>
            <div className= "snack-container">
                <h2>Snacks</h2>
                <Link to="/search_food"><button onClick={() => setSelectedMeal("Snack")}>Add Snacks</button></Link>
                <div className = "snack-list"></div>
            </div>


        </div>
    )
}

export default FoodDashboard;