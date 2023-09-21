import React, {useState, useEffect} from 'react';
import SearchFoodBar from './SearchFoodBar';
import FoodItemsList from './FoodItemsList';
import searchpage from "../CSS/searchpage.css"

function SearchResultsPage ({currentUser,setFoodItem, foodItem, selectedMeal, setTotalCaloriesIAte, setSearchedItems, searchedItems, currentFoodResponse, setCurrentUser, addToFoodList}) {
 
const [searchedList, setSearchedList] = useState(true)
useEffect(() => {
    fetch('/check_session')
    .then(response => {
        if(response.ok) {
        response.json()
        .then(user => setCurrentUser(user))
        }
    })
    }, [])
//is user is not equal to session id, forbid them 
    return(
        <div className="search-bg-image" >
            <div className="search-page">
            <SearchFoodBar setSearchedItems={setSearchedItems} />
            <FoodItemsList setSearchedItems={setSearchedItems}setTotalCaloriesIAte={setTotalCaloriesIAte} foodItem={foodItem} setFoodItem={setFoodItem} selectedMeal={selectedMeal} searchedItems={searchedItems} addToFoodList={addToFoodList} currentUser={currentUser} currentFoodResponse={currentFoodResponse} />
            </div>
        </div>
    )
}

export default SearchResultsPage;