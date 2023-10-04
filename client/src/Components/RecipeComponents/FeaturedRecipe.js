import React, {useEffect} from 'react';
import CSS from '../../CSS/recipe.css'

function FeaturedRecipe ({currentUser, setCurrentUser, featuredRecipe,setRecipes, recipes, selectedRecipeMeal, setSelectedRecipeMeal: addSelectedRecipeHandler}) {

    useEffect(() => {
        fetch('/check_session')
        .then(response => {
            if(response.ok) {
            response.json()
            .then(user => setCurrentUser(user))
            }
        })
    }, [])

    function  handleAddSelectedRecipe() {

        addSelectedRecipeHandler(selectedRecipeMeal)
      
        fetch('/post_selected_recipe',{
            method: 'POST',
            headers: {
                "Content-Type": "application/JSON",
            },
            body: JSON.stringify({
                "name": featuredRecipe.name, 
                "image":featuredRecipe.image,
                "description": featuredRecipe.description,
                "selectedRecipeMeal": selectedRecipeMeal,
                "user_id": currentUser.user.user_id
            })
        })
            .then(response => response.json())
            .then(data =>{
                console.log("the recipe I added", data)
                setRecipes([...recipes, data])})
    }

    return (
        <div class="card mb-3" style={{ width: "100%", height: "1500px"  }}>
            <div class="row g-0">
            <div class="col-md-4">
                <img src={featuredRecipe.image}style={{ width: "500px", height:"500px" }} class="img-fluid rounded-start" alt="featured recipe"/>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h2 class="card-title mb-3 ms-3">{featuredRecipe.name}</h2>
                <p class="card-text fs-7 ms-3">{featuredRecipe.description}</p>
                <h3 class="ms-3">Instructions</h3>
                <p class="card-text ms-3">{featuredRecipe.instructions}</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                
                <div class="dropdown">
                    <button class="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Add Recipe
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" onClick={() =>  handleAddSelectedRecipe("Breakfast")} href="#">Breakfast</a></li>
                        <li><a class="dropdown-item" onClick={() =>  handleAddSelectedRecipe("Lunch")} href="#">Lunch</a></li>
                        <li><a class="dropdown-item" onClick={() =>  handleAddSelectedRecipe("Dinner")} href="#">Dinner</a></li>
                        <li><a class="dropdown-item" onClick={() =>  handleAddSelectedRecipe("Dessert")} href="#">Dessert</a></li>
                        <li><a class="dropdown-item" onClick={() =>  handleAddSelectedRecipe("Drinks")} href="#">Drinks</a></li>
                        <li><a class="dropdown-item" onClick={() =>  handleAddSelectedRecipe("Appetizers")} href="#">Appetizers</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
};

export default FeaturedRecipe;