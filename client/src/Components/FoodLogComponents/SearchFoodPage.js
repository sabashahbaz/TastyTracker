import React, {useState} from 'react';
import CSS from "../../CSS/searchpage.css"

function SearchFood ({setSearchedItems}) {

    const [newSearch, setNewSearch] = useState("") //users input

    function handleChange(e) {
        setNewSearch(e.target.value)
    }

    //search for food item 
    function handleSubmit(e) {
        e.preventDefault(); 
        fetch('/search_food_items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accepts": 'application/json'
            },
            body: JSON.stringify({"query": newSearch})
        })
        .then(response => response.json())
        .then(filteredFoodObject => setSearchedItems(filteredFoodObject["items"]));
    }


    return (
        <form  className="search-container" onSubmit={handleSubmit} >
            <div className="search-page-background">
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
            </div>
        </form>
    )
}

export default SearchFood;