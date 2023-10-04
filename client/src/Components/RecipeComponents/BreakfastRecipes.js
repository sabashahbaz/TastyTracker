import React, {useState, useEffect} from 'react';

function BreakfastRecipes ({recipes}) {
    const [breakfastRecipes, setBreakfastRecipes] = useState("")
    

    useEffect(() => {
        fetch('/check_session')
        .then(response => {
            if(response.ok) {
                return response.json()
            }
        })
        .then(data => {
            console.log("did it finally work?",data)
            
        });
    }, []);

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