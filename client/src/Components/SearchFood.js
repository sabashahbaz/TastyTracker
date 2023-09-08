import React, {useState} from 'react';

function SearchFood ({setFoodItems}) {

    const [newSearch, setNewSearch] = useState("")

    function handleChange(e) {
        setNewSearch(e.target.value)
    }

    function handleSubmit(e) {
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
        .then(foodItems => setFoodItems(foodItems))
    }

    return (
        <form  className="food-search-container" onSubmit={handleSubmit}>
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