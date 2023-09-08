import React, {useState} from 'react';

function SearchFood ({setFoodItems, searchInput, changeSearch}) {

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
        // .then(filteredFoodObject => {
        //     console.log("JSONified Data: ")
        //     console.log(filteredFoodObject)
        //     console.log("\n\n\n")
        //     console.log("Unwrapped Array Data")
        //     console.log(filteredFoodObject["items"])
        // })
        .then(filteredFoodObject => setFoodItems(filteredFoodObject["items"]))
        // foodItems = filteredFoodObject["items"]
        }
    // function handleChange(e) {
    //     setNewSearch(e.target.value)
    // }

    // function handleSubmit(e) {
    //     e.preventDefault()
    //     fetch('/search_food_items', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "Accepts": 'application/json'
    //         },
    //         body: JSON.stringify({"query": newSearch})
    //     })
    //     .then(response => response.json())
    //     .then(foodItems => setFoodItems(foodItems))
    // }

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