import React, {useState, useEffect} from 'react';
import SearchFoodBar from './SearchFoodBar';
import FoodItemsList from './FoodItemsList';
import CSS from "../CSS/searchpage.css"

function SearchResultsPage ({
    currentUser,
    setFoodItem, 
    foodItem, 
    selectedMeal, 
    setTotalCaloriesIAte, 
    setSearchedItems, 
    searchedItems, 
    currentFoodResponse, 
    setCurrentUser,
    setCurrentFoodLog,
    currentFoodLog
    }) {
    
        // const [currentFoodLog, setCurrentFoodLog] = useState("")
    //check user login 
    useEffect(() => {
        fetch('/check_session')
        .then(response => {
            if(response.ok) {
            response.json()
            .then(data => {
                console.log("what is the data",data.total_calories_eaten.id)
                setCurrentUser(data)
                setCurrentFoodLog(data.total_calories_eaten.id)
            })

            }
        })
    }, [])

    return(
        <div className="search-bg-image" >
            <div className="search-page">
            <SearchFoodBar 
                setSearchedItems={setSearchedItems} />
            <FoodItemsList /* the list of searched items */
                setSearchedItems={setSearchedItems}
                setTotalCaloriesIAte={setTotalCaloriesIAte} 
                foodItem={foodItem} 
                setFoodItem={setFoodItem} 
                selectedMeal={selectedMeal}
                searchedItems={searchedItems}  
                currentUser={currentUser} 
                currentFoodResponse={currentFoodResponse}
                currentFoodLog={currentFoodLog} />
            </div>
        </div>
    )
}

export default SearchResultsPage;