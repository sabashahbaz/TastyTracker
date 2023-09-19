import React, {useEffect} from 'react';
import SearchFoodBar from './SearchFoodBar';
import FoodItemsList from './FoodItemsList';

function SearchResultsPage ({currentUser,setFoodItem, foodItem, selectedMeal, setTotalCaloriesIAte, setSearchedItems, searchedItems, currentFoodResponse, setCurrentUser, addToFoodList}) {
 

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
        <div>
            <SearchFoodBar setSearchedItems={setSearchedItems} />
            <FoodItemsList setTotalCaloriesIAte={setTotalCaloriesIAte} foodItem={foodItem} setFoodItem={setFoodItem} selectedMeal={selectedMeal} searchedItems={searchedItems} addToFoodList={addToFoodList} currentUser={currentUser} currentFoodResponse={currentFoodResponse} />


        </div>
    )
}

export default SearchResultsPage;