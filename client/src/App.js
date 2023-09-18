import './App.css';
import React, { useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CreateAccountPage from './Components/CreateAccountPage.js';
import FoodDashBoardPage from './Components/FoodDashboardPage'
import Error from './Error';
import SearchResultsPage from './Components/SearchResultsPage'
import NavBar from './Components/NavBar'
import LoginPage from "./Components/LoginPage"
import WelcomePage from './Components/WelcomePage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [searchedItems, setSearchedItems] = useState([]) //the food items that are returned from the search 
  const [foodItem, setFoodItem] = useState([]) //the food item that is selected by user 
  const [selectedMeal, setSelectedMeal] = useState("")
  const [caloriesIAte, setCaloriesIAte] = useState("")
  const [totalCaloriesRemaining, setTotalCaloriesRemaining] = useState("")
  const [currentTdee, setCurrentTdee] = useState("")

  useEffect(() => {
    fetch('/check_session')
    .then(response => {
      if(response.ok) {
        response.json()
        .then(user => setCurrentUser(user))
      }
    })
  }, [])

function addToFoodList (foodToAdd) {   // add the selected food list to its designated area
  fetch('/add_to_food_list', {
      method: 'POST',
      headers: {
          "Content-Type": "application/JSON",
      },
      body: JSON.stringify({
                      "name": foodToAdd.name, 
                      "description": foodToAdd.description,
                      "calories": foodToAdd.calories,
                      "meal_type": selectedMeal,
                      "user_id": currentUser.user_id,
      })
    })
      .then(response => response.json())
      .then(data => setFoodItem([...foodItem, data]))
  return foodItem 
}


  return (
      <BrowserRouter>
      <NavBar
        caloriesIAte={caloriesIAte} totalCaloriesRemaining={totalCaloriesRemaining}
        currentUser={currentUser} setCurrentUser={setCurrentUser}>Navbar</NavBar>
        <Routes>
        <Route path="/" element = {
          <WelcomePage/>}
        />
        <Route path="/food_log" element={
                <FoodDashBoardPage 
                setCurrentTdee = {setCurrentTdee}
                caloriesIAte={caloriesIAte}
                currentTdee={currentTdee}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                searchedItems={searchedItems}
                foodItem={foodItem}
                setSearchedItems={setSearchedItems}
                setSelectedMeal={setSelectedMeal}
                />} />
          <Route path="search_food" element={
                <SearchResultsPage 
                setCurrentUser={setCurrentUser}
                setSearchedItems={setSearchedItems} searchedItems={searchedItems} 
                addToFoodList={addToFoodList}
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




