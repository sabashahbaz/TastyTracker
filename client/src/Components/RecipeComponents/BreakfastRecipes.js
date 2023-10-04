import React, {useState, useEffect} from 'react';

function BreakfastRecipes ({recipes}) {
    const [breakfastRecipes, setBreakfastRecipes] = useState("")
    console.log("what is recipes", recipes)
    console.log("what is the breakfast", breakfastRecipes)

    useEffect(() => {
        // Make an API request to fetch breakfast recipes
        fetch('/get_recipes?meal_type=breakfast')
          .then((response) => response.json())
          .then((data) => setBreakfastRecipes(data));
      }, []);

      console.log("breakfast recipes????",breakfastRecipes)

    return (
        <div class="breakfast-card card border-light mb-3 d-flex aligns-items-center justify-content-center w-50 mx-auto" style={{ width: '18rem'}}>
        <h5 class="card-header">Breakfast</h5>
        <div class="card-body">
            <div className = "breakfast-list">
                    {recipes.map((recipe) => {
                        if (recipe.meal_type == "Breakfast") {
                            return (
                                <div className="breakfast-item list-group-item list-group-item-action list-group-item-primary justify-content-center w-100">
                                    <b class="fs-5">{recipe.name}</b>
                                    <br></br>
                                    
                                    
                                </div>

                            )}})}
            </div>
            <p>breakfast bitches</p>
    </div>
    </div>
    )
}

export default BreakfastRecipes;

{/* <small onClick={() =>deleteItem(item.id)}>🗑️</small> */}