import React, {useState, useEffect} from 'react';
import RecipesNavbar from '../RecipeComponents/RecipesNavbar';
import BreakfastRecipes from '../RecipeComponents/BreakfastRecipes';
import { Outlet } from 'react-router-dom';
import CSS from '../../CSS/recipepage.css'

function RecipesPage({setCurrentUser, setRecipes, recipes }) {

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

      console.log("saved recipes",savedRecipes)

      function handleMealButton (meal) {
        console.log(meal)
        setSelectedMealType(meal)
      }
      
      return (
        <div>
          <div className="">
            <div className="buttons-container">
              <button className="button" onClick={() => handleMealButton('Breakfast')}> 🥞 Breakfast 🥞 </button>
              <button className="button" onClick={() => handleMealButton('Lunch')}> 🥙 Lunch 🥙 </button>
              <button className="button" onClick={() => handleMealButton('Dinner')}>🍝 Dinner 🍝</button>
              <button className="button" onClick={() => handleMealButton('Dessert')}>🧁 Dessert 🧁</button>
              <button className="button" onClick={() => handleMealButton('Appetizers')}> 🍤 Appetizers 🍤</button>
              <button className="button" onClick={() => handleMealButton('Drinks')}> 🍹 Drinks 🍹</button>
            </div>
          </div>
        
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
      )}

export default RecipesPage;




{/* <div className="col-md-3 mb-3" key={recipe.id}>
        //           <div className="card border-light" style={{ width: "300px" }}>
        //             <div className="card-body">
        //               <h5 className="card-title fs-6">{recipe.name}</h5>
        //               <img
        //                 src={recipe.image_url}
        //                 className="card-img-bottom rounded mx-auto d-block"
        //                 style={{ width: "260px", height: "250px" }}
        //                 alt="recipe image"
        //               />
        //             </div>
        //           </div>
        //         </div>
        //       ))}
        //   </div> */}
