import React, {useState, useEffect} from 'react';
import CSS from '../../CSS/recipepage.css'

function RecipesPage({setCurrentUser, setRecipes, recipes }) {

  //saved recipe page 
  const [selectedMealType, setSelectedMealType] = useState('Breakfast');
  const [savedRecipes, setSavedRecipes] = useState([])

    useEffect(() => {
        fetch('/check_session')
        .then(response => {
          if(response.ok) {
            response.json()
            .then(data => {
              // console.log("pleasework",user)
              setCurrentUser(data.user)
              setSavedRecipes(data.saved_recipes)})
          }
        })
    }, [])

      function handleMealButton (meal) {
        setSelectedMealType(meal)
      }
      
      return (
        <div className="saved-recipes-bg">
          <div className="">
            <div className="buttons-container">
              <button className="meal-button" onClick={() => handleMealButton('Breakfast')}> 🥞 Breakfast 🥞 </button>
              <button className="meal-button" onClick={() => handleMealButton('Lunch')}> 🥙 Lunch 🥙 </button>
              <button className="meal-button" onClick={() => handleMealButton('Dinner')}>🍝 Dinner 🍝</button>
              <button className="meal-button" onClick={() => handleMealButton('Dessert')}>🧁 Dessert 🧁</button>
              <button className="meal-button" onClick={() => handleMealButton('Appetizers')}> 🍤 Appetizers 🍤</button>
              <button className="meal-button" onClick={() => handleMealButton('Drinks')}> 🍹 Drinks 🍹</button>
            </div>
          </div>
        <div className="saved-recipes">
          <div className="row">
              {savedRecipes.map((recipe) => {
              if (recipe.recipe_meal_type == selectedMealType) 
                  return (
                    <div className="col-md-3 mb-3" key={recipe.id}>
                    <div className="card border-light" style={{ width: "300px" }}>
                      <div className="card-body">
                      <h5 className="card-title fs-6">{recipe.name}</h5>
                          <img
                              src={recipe.image_url}
                              className="card-img-bottom rounded mx-auto d-block"
                              style={{ width: "260px", height: "250px" }}
                              alt="recipe image"
                          />
                      </div>
                  </div>
                  </div>
                );
              })}
            </div>
        </div>
      </div>
    )
  };

export default RecipesPage;

