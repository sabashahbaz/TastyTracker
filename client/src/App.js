import './App.css';
import React, { useState, useEffect} from "react";
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import CreateAccountPage from './Components/CreateAccountPage.js';
import FoodLogPage from './Components/FoodLogPage'
import Error from './Error';
import SearchResultsPage from './Components/SearchResultsPage'
import NavBar from './Components/NavBar'
import LoginPage from "./Components/LoginPage"
import WelcomePage from './Components/WelcomePage';
import AboutUs from './Components/AboutUs';
import { ProgressBar } from './Components/ProgressBar';
import MyRecipesPage from './Components/MyRecipesPage'
import BreakfastRecipes from './Components/BreakfastRecipes';
import LunchRecipes from './Components/LunchRecipes';
import DinnerRecipes from './Components/DinnerRecipes';
import DrinksRecipes from './Components/DrinksRecipes';
import DessertRecipes from './Components/DessertRecipes';
import AppetizersRecipes from './Components/AppetizersRecipes';
import 'bootstrap/dist/css/bootstrap.min.css';
import searchpage from "./CSS/searchpage.css"


function App() {
  //Setting state variables 
  const [currentUser, setCurrentUser] = useState(null)
  const [searchedItems, setSearchedItems] = useState([]) //the food items that are returned from the search 
  const [foodItem, setFoodItem] = useState([]) //the food item that is selected by user to add to food log 
  const [selectedMeal, setSelectedMeal] = useState("") //setting the meal type for the meal selected by the user 
  const [caloriesIAte, setTotalCaloriesIAte] = useState("") //cumulation of the total calories user ate
  // const [totalCaloriesRemaining, setTotalCaloriesRemaining] = useState("")
  const [currentTdee, setCurrentTdee] = useState("") 
  const [currentFoodResponse, setCurrentFoodResponse] = useState(null);
  const [currentFoodLog, setCurrentFoodLog] = useState("")

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
      <NavBar caloriesIAte={caloriesIAte} currentUser={currentUser} setCurrentUser={setCurrentUser}></NavBar>
        <Routes>
        <Route path="/about_us" element={
          <AboutUs currentUser={currentUser} />
        }>
        </Route>
        <Route path="my_recipes" element={<MyRecipesPage />}>
            <Route path='breakfast' element={<BreakfastRecipes />} />
            <Route path='lunch' element={<LunchRecipes />} />
            <Route path='dinner' element={<DinnerRecipes />} />
            <Route path='dessert' element={<DessertRecipes />} />
            <Route path='drinks' element={<DrinksRecipes />} />
            <Route path='appetizers' element={<AppetizersRecipes />} />
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
        </Routes>
      </BrowserRouter>

  );

}


export default App;

