import React, {useState} from 'react';
import searchpage from "../CSS/searchpage.css"

function SearchFood ({setSearchedItems}) {

    const [newSearch, setNewSearch] = useState("")

    function handleChange(e) {
        setNewSearch(e.target.value)
    }

    function handleSubmit (e) {
        e.preventDefault()
        fetch('/search_food_items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accepts": 'application/json'
            },
            body: JSON.stringify({"query": newSearch})
        })
        .then(response => response.json())
        .then(filteredFoodObject => setSearchedItems(filteredFoodObject["items"]))
        // When we click a food item to add it to our food log, before we navigate away to the food log, 
        // we need to invoke `setSearchedItems()` again but this time set it to an empty array. This way,
        // the page will immediately clear all searched items. But, we need to make sure we do this AFTER
        // we set the food item state to be added to the log. 
        }


    return (
        <form  className="search-container" onSubmit={handleSubmit} >
            <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" class="scrollspy-example" tabindex="0">
  
</div>
            <div  className="search-title">
                <h3 className="search-title-header">search food items</h3>
                <input
                className="search-bar"
                type="text"
                placeholder="search food"
                onChange={handleChange}
                value={newSearch}
                />
            </div>
        </form>

        

    )
}

export default SearchFood;