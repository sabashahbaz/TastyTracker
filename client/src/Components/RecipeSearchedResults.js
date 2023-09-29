import React from 'react';

function RecipeSearchedResults ({searchedRecipes}) {
console.log("searched recipes",searchedRecipes)
    return (
        <div className="row">
        {searchedRecipes.map((recipe, index) => (
            <div className="col-md-3 mb-3" key={index}>
            <div className="card border-light" style={{ width: "300px" }}>
                <div className="card-body">
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
    )
}

export default RecipeSearchedResults;