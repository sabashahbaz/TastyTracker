import React from 'react';
import SearchFoodBar from './SearchFoodBar';
import FoodItemsList from './FoodItemsList';

function SearchResultsPage ({setItems, items, addToFoodList}) {

    return(
        <div>
            <p>search bar and food results will be displayed here</p>
            <SearchFoodBar setItems={setItems} />
            <FoodItemsList items={items} addToFoodList={addToFoodList} />


        </div>
    )
}

export default SearchResultsPage;