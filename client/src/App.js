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
import WelcomePage from './Components/WelcomePage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null)
  const [searchedItems, setSearchedItems] = useState([]) //the food items that are returned from the search 
  const [foodItem, setFoodItem] = useState([]) //the food item that is selected by user 
  const [selectedMeal, setSelectedMeal] = useState("")
  const [caloriesIAte, setCaloriesIAte] = useState("")
  const [totalCaloriesRemaining, setTotalCaloriesRemaining] = useState("")
  const [currentTdee, setCurrentTdee] = useState(0)

  
  useEffect(() => {
    fetch('/check_session')
    .then(response => {
      if(response.ok) {
        response.json()
        .then(user => setCurrentUser(user))
      }
    })
  }, [])

  function createAccountAndTdee(userInfo) {
    fetch('/create_account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setCurrentUser(data.user.username)
        setCurrentTdee(data.user.tdee)
        console.log(currentTdee)
      })
      .catch(error => {console.log("front-end is broken", error)})  
  };
  console.log(currentTdee)

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

  // console.log(currentUser)

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
          {/* <Route path="tdee_calculator" element={<TdeeCalculator setCurrentUser={setCurrentUser} calculate_tdee={calculate_tdee} setCurrentTdee={setCurrentTdee} />} /> */}
          <Route path="tdee_calculator" element={<TdeeCalculator
                                create_account_tdee ={createAccountAndTdee}
                                setCurrentUser={setCurrentUser}
                                // calculate_tdee={calculate_tdee} 
                                setCurrentTdee={setCurrentTdee}/>}
                                /> 
                {/* <Route path="tdee_calculator" element={<TdeeCalculator setCurrentUser={setCurrentUser} calculate_tdee={calculate_tdee} setCurrentTdee={setCurrentTdee}/>}/>    */}
                {/* <Route path="create_account" element={<CreateAccountPage createAccount={createAccount}/>}>
          </Route> */}

          <Route path="login" element={
            <LoginPage
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            />} />
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>

  );

}


export default App;


