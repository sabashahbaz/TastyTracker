import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

// recipe search bar on navbar 
function RecipeSearchBar({setSearchedRecipes}) {

    const navigate = useNavigate();
    const [newRecipeSearch, setNewRecipeSearch] = useState("")

    //setting user input as newRecipeSearch
    function handleRecipeChange(e) {
        setNewRecipeSearch(e.target.value)
    }
    
    //GET request with user input to external API
    function handleRecipeSubmit(e) {
        e.preventDefault();
        console.log("inside recipie search fetch");
        fetch(`/search_recipes/${newRecipeSearch}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Accepts": 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log("data", data)
            setSearchedRecipes(data);
            navigate('/recipe_results'); //navigate to recipe results page when results are received 
        });
    }

    return (
        <form  className="recipe-search-container" onSubmit={handleRecipeSubmit} >
            <div>
                <div  className="recipe-search-title">
                    <h3 className="recipe-search-title-header"></h3>
                    <input
                    className="recipe-search-bar fs-5 "
                    type="text"
                    placeholder="search recepies"
                    onChange={handleRecipeChange}
                    value={newRecipeSearch}
                    />
                </div>
            </div>
        </form> 
    )
};

export default RecipeSearchBar;