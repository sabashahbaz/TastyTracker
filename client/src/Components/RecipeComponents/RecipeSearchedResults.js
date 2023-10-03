import React from 'react';
import {useNavigate, Outlet} from 'react-router-dom';

function RecipeSearchedResults ({searchedRecipes, setFeaturedRecipe}) {
    const navigate = useNavigate();
    
    function handleClickedRecipe (recipe) {
        setFeaturedRecipe(recipe)
        navigate('/featured_recipe')
    }
    return (
        <div>
            <Outlet />
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
    )
}

export default RecipeSearchedResults;