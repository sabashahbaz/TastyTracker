import React, {useState} from 'react';
import {Link} from 'react-router-dom';
// import SearchFood from './SearchFoodBar';

function FoodDashboard ({foodList, setSelectedMeal}) {
    console.log("from food dashboard", foodList)
    // const [selectedMeal, setSelectedMeal] = useState("")

    return (
        <div className = "food_dashboard">
            <div className= "breakfast-container">
                <h2>Breakfast</h2>
                <Link to="/search_food"><button onClick={() => setSelectedMeal("Breakfast")}>Add Breakfast</button></Link>
                <div className = "breakfast-list">
                    <p>this succks</p>
                    {foodList.map((foodItem) => {
                        if (foodItem.meal_type === "Breakfast") {
                            return ( 
                                <div key={foodItem.id}>
                                    <div name={foodItem.name}></div>
                                    <div calories={foodItem.calories}></div>
                                </div>
                            ) 
                        } else { return null}
                        })}  
                </div>
            </div>
            <div className= "Lunch-container">
                <h2>Lunch</h2>
                <Link to="/search_food"><button onClick={() => setSelectedMeal("Lunch")}>Add Lunch</button></Link>
                <div className = "lunch-list">
                    {foodList.map(foodItem => ( 
                        foodList.meal_type === "Lunch" ? (
                            <div key={foodItem.id}>
                                <div name={foodItem.name}></div>
                                <div calories={foodItem.calories}></div>
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
            <div className= "dinner-container">
                <h2>Dinner</h2>
                <Link to="/search_food"><button onClick={() => setSelectedMeal("Dinner")}>Add Dinner</button></Link>
                <div className = "dinner-list">
                    {foodList.map(foodItem => ( 
                        foodList.meal_type === "Dinner" ? (
                            <div key={foodItem.id}>
                                <div name={foodItem.name}></div>
                                <div calories={foodItem.calories}></div>
                            </div>
                    ) : null
                    ))}
                </div>
            </div>
            <div className= "snack-container">
                <h2>Snacks</h2>
                <Link to="/search_food"><button onClick={() => setSelectedMeal("Snack")}>Add Snacks</button></Link>
                <div className = "snack-list">
                    {foodList.map(foodItem => ( 
                        foodList.meal_type === "Snack" ? (
                            <div key={foodItem.id}>
                                <div name={foodItem.name}></div>
                                <div calories={foodItem.calories}></div>
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
            </div>
    )
}

export default FoodDashboard;


    // const [breakfastList, setBreakfastList] = useState([])
    // const [lunchList, setLunchList] = useState([])
    // const [dinnerList, setDinnerList] = useState([])
    // const [snackList, setSnackList] = useState([])
    
    // function addFoodUnderCorrectSection() {
    //     if (selectedMeal === "Breakfast") {
    //         breakfastList.push(foodList);
    //     } else if (selectedMeal === "Lunch") {
    //         lunchList.push(foodList);
    //     } else if (selectedMeal === "Dinner") {
    //         dinnerList.push(foodList);
    //     } else if (selectedMeal === "Snack") {
    //         snackList.push(foodList);
    //     }
    // }
 
    // const[meals, setMeals] = useState ({
    //     Breakfast: [],
    //     Lunch: [],
    //     Dinner: [],
    //     Snack: [],
    // })

    // function addFoodUnderCorrectSection() {
    //     if (selectedMeal === "Breakfast") {
    //         breakfastList.push(foodList);
    //     } else if (selectedMeal === "Lunch") {
    //         lunchList.push(foodList);
    //     } else if (selectedMeal === "Dinner") {
    //         dinnerList.push(foodList);
    //     } else if (selectedMeal === "Snack") {
    //         snackList.push(foodList);
    //     }
    // }

    // function addFoodUnderCorrectSection() {
    //     if (selectedMeal && foodList.length > 0) {
    //         // Create a copy of the meals object to avoid mutating state directly
    //         const updatedMeals = { ...meals };

    //         // Push the foodList to the selected meal's list
    //         updatedMeals[selectedMeal].push(...foodList);

    //         // Update the state with the new meals object
    //         setMeals(updatedMeals);
    //     }
    // }
