import React, {useState} from 'react';
import SearchFoodBar from './SearchFoodBar';
import FoodItemsList from './FoodItemsList';

function SearchResultsPage ({setFoodItems, foodItems, searchInput, changeSearch}) {

    return(
        <div>
            <p>search bar and food results will be displayed here</p>
            <SearchFoodBar setFoodItems={setFoodItems}  searchInput={searchInput}  changeSearch={changeSearch}/>
            <FoodItemsList searchInput={searchInput} foodItems={foodItems} />


        </div>
    )
}

export default SearchResultsPage;