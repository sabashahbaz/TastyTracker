import './App.css';
import React, { useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CreateAccountPage from './Components/CreateAccountPage.js';
import FoodLogPage from './Components/FoodLogPage'
import Error from './Error';
import SearchResultsPage from './Components/SearchResultsPage'
import NavBar from './Components/NavBar'
import LoginPage from "./Components/LoginPage"
import WelcomePage from './Components/WelcomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import searchpage from "./CSS/searchpage.css"

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [searchedItems, setSearchedItems] = useState([]) //the food items that are returned from the search 
  const [foodItem, setFoodItem] = useState([]) //the food item that is selected by user 
  const [selectedMeal, setSelectedMeal] = useState("")
  const [caloriesIAte, setTotalCaloriesIAte] = useState("")
  const [totalCaloriesRemaining, setTotalCaloriesRemaining] = useState("")
  const [currentTdee, setCurrentTdee] = useState("")
  const [currentFoodResponse, setCurrentFoodResponse] = useState(null);

  // console.log("currentUser",currentUser.user.user_id)
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
      <NavBar
        caloriesIAte={caloriesIAte} totalCaloriesRemaining={totalCaloriesRemaining}
        currentUser={currentUser} setCurrentUser={setCurrentUser}>Navbar</NavBar>
        <Routes>
        <Route path="/" element = {
          <WelcomePage/>}
        /> 

          {currentUser ? (
            <Route
              path="/food_log"
              element={
                <FoodLogPage
                  setTotalCaloriesIAte={setTotalCaloriesIAte}
                  setCurrentTdee={setCurrentTdee}
                  caloriesIAte={caloriesIAte}
                  currentTdee={currentTdee}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  searchedItems={searchedItems}
                  foodItem={foodItem}
                  setSearchedItems={setSearchedItems}
                  setSelectedMeal={setSelectedMeal}
                />
              }
            />
          ) : null}
          <Route path="search_food" element={
                <SearchResultsPage className="search-bg-img"
                foodItem={foodItem}
                setFoodItem={setFoodItem}
                selectedMeal={selectedMeal}
                setTotalCaloriesIAte={setTotalCaloriesIAte}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setSearchedItems={setSearchedItems} searchedItems={searchedItems} 
                // addToFoodList={addToFoodList}
                currentFoodResponse= {currentFoodResponse}
                />} /> 
          <Route path="tdee_calculator" element={<CreateAccountPage
                                // create_account_tdee ={createAccountAndTdee}
                                setCurrentUser={setCurrentUser}
                                // calculate_tdee={calculate_tdee} 
                                setCurrentTdee={setCurrentTdee}/>}
                                /> 
          <Route path="login" element={
            <LoginPage
            setCurrentTdee={setCurrentTdee}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            />} />
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>

  );

}


export default App;

