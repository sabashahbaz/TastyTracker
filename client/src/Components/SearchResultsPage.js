import React, {useEffect} from 'react';
import SearchFoodBar from './SearchFoodBar';
import FoodItemsList from './FoodItemsList';

function SearchResultsPage ({setSearchedItems, searchedItems, setCurrentUser, addToFoodList}) {


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
            <p>search bar and food results will be displayed here</p>
            <SearchFoodBar setSearchedItems={setSearchedItems} />
            <FoodItemsList searchedItems={searchedItems} addToFoodList={addToFoodList} />


        </div>
    )
}

export default SearchResultsPage;