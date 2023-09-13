import React, {useState} from 'react';

function SearchFood ({setSearchedItems}) {

    const [newSearch, setNewSearch] = useState("")

    function handleChange(e) {
        setNewSearch(e.target.value)
    }

    function handleSubmit (e) {
        e.preventDefault()
        console.log("I'm in the search bar and this is my newSearch: ", newSearch)
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
        }


    return (
        <form  className="food-search-container" onSubmit={handleSubmit} >
            <h2>Search for food here</h2>
            <input
            className="search-bar"
            type="text"
            placeholder="search food"
            onChange={handleChange}
            value={newSearch}
            />
        </form>

        

    )
}

export default SearchFood;