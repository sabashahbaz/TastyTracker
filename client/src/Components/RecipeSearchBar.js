import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function RecipeSearchBar({setSearchedRecipes}) {

    const navigate = useNavigate();
    const [newRecipeSearch, setNewRecipeSearch] = useState("")

    // console.log("newRecipeSearch", newRecipeSearch)

    function handleRecipeChange(e) {
        setNewRecipeSearch(e.target.value)
    }
    
    function handleRecipeSubmit(e) {
        e.preventDefault();
        console.log("inside fetch");
        fetch(`/search_recipes/${newRecipeSearch}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Accepts": 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log("what is the response I am getting back", data);
            setSearchedRecipes(data);
            navigate('/recipe_results');
        });
    }
    return (
        
        <form  className="recipe-search-container" onSubmit={handleRecipeSubmit} >
            <div>
                <div  className="recipe-search-title">
                    <h3 className="recipe-search-title-header"></h3>
                    <input
                    className="recipe-search-bar fs-6"
                    type="text"
                    placeholder="search recepies"
                    onChange={handleRecipeChange}
                    value={newRecipeSearch}
                    />
                </div>
            </div>
        </form> 
    )
}

export default RecipeSearchBar;