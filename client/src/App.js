import './App.css';
import React, { useState, useEffect} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TdeeCalculator from './Components/TdeeCalculator';
import FoodDashBoardPage from './Components/FoodDashboardPage'
import Error from './Error';
import SearchResultsPage from './Components/SearchResultsPage'
import NavBar from './Components/NavBar'
import CreateAccountPage from './Components/CreateAccountPage'
import LoginPage from "./Components/LoginPage"

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [searchedItems, setSearchedItems] = useState([]) //the food items that are returned from the search 
  const [foodItem, setFoodItem] = useState([]) //the food item that is selected by user 
  const [selectedMeal, setSelectedMeal] = useState("")
  const [caloriesIAte, setCaloriesIAte] = useState("")
  const [totalCaloriesRemaining, setTotalCaloriesRemaining] = useState("")
  const [currentTdee, setCurrentTdee] = useState(0)

  // useEffect(() => {
  //   fetch('/check_session')
  //     .then(user => setCurrentUser(user))
  //     .then(() => console.log("\n > useEffect completed."))
  // }, []);

  useEffect(() => {
    fetch('/check_session')
    .then(response => {
      if(response.ok) {
        response.json()
        .then(user => setCurrentUser(user))
      }
    })
  }, [])

  function createAccount(userInfo) {
    console.log(userInfo)
    fetch('create_account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(response => response.json())
      .then(data => setCurrentUser(data))
  };

  function attemptLogin (userInfo) {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(response => response.json())
      .then(data => setCurrentUser(data))
  }

  function logout () {
    fetch('/logout', {method: 'DELETE'})
    .then(response => {
      if(response.ok) {setCurrentUser(null)}})
    }

function calculate_tdee(userInfo) {
  console.log('user info', userInfo)
fetch('/calculate_tdee', {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json',
  'Accepts': 'application/json'
  },
  body: JSON.stringify(userInfo)
})
.then(response => response.json())
.then(data => setCurrentTdee(data))
.catch(error => {
  console.error('Error:', error);
  // Handle the error, e.g., show an error message to the user
});
}

  function addToFoodList (foodToAdd) {   // add the selected food list to its designated area
    console.log("currentUser",currentUser.user_id)
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
        .catch(error => {console.log("front-end is broken", error)})  
    return foodItem 
  }

  console.log(currentTdee)

  return (
      <BrowserRouter>
      <NavBar
        caloriesIAte={caloriesIAte} totalCaloriesRemaining={totalCaloriesRemaining}
        currentUser={currentUser} logout={logout}>Navbar</NavBar>
        <Routes>
          <Route path="/" element={
                <FoodDashBoardPage 
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
          <Route path="tdee_calculator" element={<TdeeCalculator setCurrentUser={setCurrentUser} calculate_tdee={calculate_tdee} setCurrentTdee={setCurrentTdee} />} />
          <Route path="create_account" element={
                <CreateAccountPage
                createAccount={createAccount}
                />} />
          <Route path="login" element={
            <LoginPage
            attemptLogin={attemptLogin}
            />} />
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>

  );

}


export default App;


