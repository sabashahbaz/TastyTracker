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
        }


    return (
        <form  className="search-container" onSubmit={handleSubmit} >
            <div  className="food-search-container justify-content-center w-50 mx-auto ">
                <h3 className="search-title">Search for food here</h3>
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