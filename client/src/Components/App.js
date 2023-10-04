import '../CSS/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from "react";
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import CreateAccountPage from './Pages/CreateAccountPage.js';
import FoodLogPage from './Pages/FoodLogPage'
import Error from './Error';
import SearchResultsPage from './Pages/FoodSearchResultsPage'
import NavBar from './NavBar'
import LoginPage from "./Pages/LoginPage"
import WelcomePage from './Pages/WelcomePage';
import AboutUs from './Pages/AboutUs';
import MyRecipesPage from './Pages/RecipesPage'
import BreakfastRecipes from './RecipeComponents/BreakfastRecipes';
import LunchRecipes from './RecipeComponents/LunchRecipes';
import DinnerRecipes from './RecipeComponents/DinnerRecipes';
import DrinksRecipes from './RecipeComponents/DrinksRecipes';
import DessertRecipes from './RecipeComponents/DessertRecipes';
import AppetizersRecipes from './RecipeComponents/AppetizersRecipes';
import RecipeSearchedResults from './RecipeComponents/RecipeSearchedResults'
import FeaturedRecipe from './RecipeComponents/FeaturedRecipe'; 
import searchpage from "../CSS/searchpage.css"


function App() {
  //Setting state variables 
  const [currentUser, setCurrentUser] = useState(null)
  const [searchedItems, setSearchedItems] = useState([]) //the food items that are returned from the search 
  const [foodItem, setFoodItem] = useState([]) //the food item that is selected by user to add to food log 
  const [selectedMeal, setSelectedMeal] = useState("") //setting the meal type for the meal selected by the user 
  const [caloriesIAte, setTotalCaloriesIAte] = useState("") //cumulation of the total calories user ate
  const [currentTdee, setCurrentTdee] = useState("") 
  const [currentFoodResponse, setCurrentFoodResponse] = useState(null);
  const [currentFoodLog, setCurrentFoodLog] = useState("")
  const [searchedRecipes, setSearchedRecipes] = useState("")
  const [featuredRecipe, setFeaturedRecipe] = useState({})
  const [selectedRecipeMeal, setSelectedRecipeMeal] = useState("")
  const [recipes, setRecipes] = useState([])

  console.log("are the recipes set",recipes)

    //check if user is logged in 
    useEffect(() => {
      fetch('/check_session')
      .then(response => {
        if(response.ok) {
          response.json()
          .then(user => setCurrentUser(user))
        }
      })
    }, [])


  return (
      <BrowserRouter>
      <NavBar caloriesIAte={caloriesIAte} 
              currentUser={currentUser} 
              setCurrentUser={setCurrentUser}
              setSearchedRecipes={setSearchedRecipes}>
              </NavBar>
        <Routes>
        <Route path="/about_us" element={
          <AboutUs currentUser={currentUser} />
        }>
        </Route>
        <Route path="my_recipes" element={<MyRecipesPage setCurrentUser={setCurrentUser}  recipes={recipes}/>}>
            {/* <Route path='breakfast' element={<BreakfastRecipes recipes={recipes}  />} />
            <Route path='lunch' element={<LunchRecipes recipes={recipes}  />} />
            <Route path='dinner' element={<DinnerRecipes recipes={recipes} />} />
            <Route path='dessert' element={<DessertRecipes recipes={recipes} />} />
            <Route path='drinks' element={<DrinksRecipes recipes={recipes} />} />
            <Route path='appetizers' element={<AppetizersRecipes recipes={recipes} />} />  */}
        </Route>
        <Route path="/" element = {
          <WelcomePage/>
        }/> 
          {currentUser 
          ? (
            <Route
              path="/food_log"
              element={
                <FoodLogPage
                  setFoodItem = {setFoodItem}
                  setCurrentFoodLog={setCurrentFoodLog}
                  setTotalCaloriesIAte={setTotalCaloriesIAte}
                  setCurrentTdee={setCurrentTdee}
                  caloriesIAte={caloriesIAte}
                  currentTdee={currentTdee}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  searchedItems={searchedItems}
                  foodItem={foodItem}
                  setSelectedMeal={setSelectedMeal}
                />
              }
            />
          ) 
          : null}
          <Route path="search_food" element={
              <SearchResultsPage className="search-bg-img"
              foodItem={foodItem}
              setFoodItem={setFoodItem}
              selectedMeal={selectedMeal}
              setCurrentFoodLog={ setCurrentFoodLog}
              setTotalCaloriesIAte={setTotalCaloriesIAte}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setSearchedItems={setSearchedItems} 
              searchedItems={searchedItems} 
              currentFoodResponse= {currentFoodResponse}
              currentFoodLog={currentFoodLog}
              />} /> 
          <Route path="create_account" element={
            <CreateAccountPage
              setCurrentUser={setCurrentUser}
              setCurrentTdee={setCurrentTdee}/>}
              /> 
          <Route path="login" element={
            <LoginPage
            setCurrentTdee={setCurrentTdee}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setTotalCaloriesIAte={setTotalCaloriesIAte}
            />} />
          <Route path="*" element={<Error/>}/>
          <Route path="recipe_results" element={
            <RecipeSearchedResults 
              searchedRecipes={searchedRecipes}
              setFeaturedRecipe={setFeaturedRecipe}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />}>
          </Route>
          <Route path='featured_recipe' element={
            <FeaturedRecipe 
              setSelectedRecipeMeal={setSelectedRecipeMeal}
              featuredRecipe={featuredRecipe}
              selectedRecipeMeal={selectedRecipeMeal}
              recipes={recipes}
              setRecipes={setRecipes} 
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              />} />
        </Routes>
      </BrowserRouter>

  );

}


export default App;

