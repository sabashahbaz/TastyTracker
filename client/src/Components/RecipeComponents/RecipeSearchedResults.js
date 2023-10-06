import React,{useEffect} from 'react';
import {useNavigate, Outlet} from 'react-router-dom';
import CSS from "../../CSS/searchedrecipes.css"

//results from recipe search
function RecipeSearchedResults ({searchedRecipes, setFeaturedRecipe, setCurrentUser}) {
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/check_session')
        .then(response => {
            if(response.ok) {
            response.json()
            .then(user => setCurrentUser(user))
            }
        })
    }, [])
    
    //when user clicks a recipe, will navgiate to featured recipe page to allow user to see more details about the recipe
    function handleClickedRecipe (recipe) {
        setFeaturedRecipe(recipe)
        navigate('/featured_recipe')
    }
    return (
        <div>
            <Outlet />
            <div className="searched-recipes">
                <div className="row">
                {searchedRecipes.map((recipe, index) => (
                    <div className="col-md-3 mb-3" key={index}>
                    <div className="card border-light" style={{ width: "300px" }}>
                        <div className="card-body" onClick={(e) => handleClickedRecipe(recipe)}>
                        <h5 className="card-title fs-6">{recipe.name}</h5>
                            <img
                                src={recipe.image}
                                className="card-img-bottom rounded mx-auto d-block"
                                style={{ width: "260px", height: "250px" }}
                                alt="recipe image"
                            />
                    </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
};

export default RecipeSearchedResults;