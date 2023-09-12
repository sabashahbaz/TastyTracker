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
  const [items, setItems] = useState([]) //the food items that are returned from the search 
  const [foodList, setFoodList] = useState([]) //the food list 
  const [selectedMeal, setSelectedMeal] = useState("")

  // useEffect(() => {
  //   fetch('/check_session')
  //     .then(user => setCurrentUser(user))
  //     .then(() => console.log("\n > useEffect completed."))
  // }, []);

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

  function addToFoodList (foodToAdd) {   // add the selected food list to its designated area
    console.log(foodToAdd)
    fetch('/add_to_food_list', {
        method: 'POST',
        headers: {
            "Content-Type": "application/JSON",
        },
        body: JSON.stringify({"item_id":foodToAdd,"meal_type": selectedMeal}),
    })
    .then(response => response.json())
    .then(data => setFoodList(data));
  }
          
    
  return (
      <BrowserRouter>
      <NavBar
        currentUser={currentUser}>Navbar</NavBar>
        <Routes>
          <Route path="/" element={
                <FoodDashBoardPage 
                items={setItems}
                setItems={setItems}
                setSelectedMeal={setSelectedMeal}
                />} />
          <Route path="search_food" element={
                <SearchResultsPage 
                setItems={setItems} items={items} 
                addToFoodList={addToFoodList}
                />} /> 
          <Route path="tdee_calculator" element={<TdeeCalculator />} />
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


