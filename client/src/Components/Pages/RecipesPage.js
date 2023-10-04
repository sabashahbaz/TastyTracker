import React, {useState, useEffect} from 'react';
import RecipesNavbar from '../RecipeComponents/RecipesNavbar';
import BreakfastRecipes from '../RecipeComponents/BreakfastRecipes';
import { Outlet } from 'react-router-dom';
import CSS from '../../CSS/recipepage.css'

function RecipesPage({setCurrentUser, recipes }) {

  const [breakfast, setBreakfast] = useState("")
  const [lunch, setLunch] = useState("")
  const [dinner, setDinner] = useState("")
  const [dessert, setDessert] = useState("")
  const [appetizers, setAppetizers] = useState("")
  const [drinks, setDrinks ] = useState("")

    useEffect(() => {
        fetch('/check_session')
        .then(response => {
          if(response.ok) {
            response.json()
            .then(user => console.log(user.user_recipes))
          }
        })
      }, [])

      console.log(recipes)

    return (
        <div>
          <div className="container">
              <div className="row">
                  <div className="col">
                      <div className="d-flex mt-3">
                          <button type="button" className="btn btn-light btn-lg m-4 ">
                          <span className="d-flex">🥞 Breakfast</span>
                          </button>
                          <button type="button" className="btn btn-light btn-lg m-4">Lunch</button>
                          <button type="button" className="btn btn-light btn-lg m-4">Dinner</button>
                          <button type="button" className="btn btn-light btn-lg m-4">Dessert</button>
                          <button type="button" className="btn btn-light btn-lg m-4">Appetizers</button>
                          <button type="button" className="btn btn-light btn-lg m-4">Drinks</button>
                      </div>
                  </div>
              </div>
          </div>
          <div>

          <div className="row">
            {recipes.map((recipe, index) => (
                <div className="col-md-3 mb-3" key={index}>
                <div className="card border-light" style={{ width: "300px" }}>
                    <div className="card-body" >
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
}

export default RecipesPage;



{/* <RecipesNavbar /> */}
            {/* <Route path='breakfast' element={<BreakfastRecipes recipes={recipes}  />} />
            <Route path='lunch' element={<LunchRecipes recipes={recipes}  />} />
            <Route path='dinner' element={<DinnerRecipes recipes={recipes} />} />
            <Route path='dessert' element={<DessertRecipes recipes={recipes} />} />
            <Route path='drinks' element={<DrinksRecipes recipes={recipes} />} />
            <Route path='appetizers' element={<AppetizersRecipes recipes={recipes} />} /> */}