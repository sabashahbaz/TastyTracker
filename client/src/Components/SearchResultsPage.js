import React from 'react';
import SearchFoodBar from './SearchFoodBar';
import FoodItemsList from './FoodItemsList';

function SearchResultsPage ({setSearchedItems, searchedItems, addToFoodList}) {

    return(
        <div>
            <p>search bar and food results will be displayed here</p>
            <SearchFoodBar setSearchedItems={setSearchedItems} />
            <FoodItemsList searchedItems={searchedItems} addToFoodList={addToFoodList} />


        </div>
    )
}

export default SearchResultsPage;