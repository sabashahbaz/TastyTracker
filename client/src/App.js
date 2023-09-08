import './App.css';
import React, { useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TdeeCalculator from './Components/TdeeCalculator';
import FoodDashBoardPage from './Components/FoodDashboardPage'
import Error from './Error';
import SearchResultsPage from './Components/SearchResultsPage'

function App() {
  const [foodItems, setFoodItems] = useState([])
  const [searchInput, setSearchInput] = useState("")

  // console.log(foodItems)

  function changeSearch(e) {
    setSearchInput(e)
  //   fetch('/search_food_items', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         "Accepts": 'application/json'
  //     },
  //     body: JSON.stringify({"query": searchInput})
  // })
  // .then(response => response.json())
  // .then(foodItems => setFoodItems(foodItems))
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FoodDashBoardPage foodItems={foodItems} setFoodItems={setFoodItems}/>} />
          <Route path="search_food" element={<SearchResultsPage setFoodItems={setFoodItems} foodItems={foodItems} searchInput={searchInput} setSearchInput={setSearchInput} changeSearch={changeSearch} />} /> 
          <Route path="tdee_calculator" element={<TdeeCalculator />} />
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>

  );
}

export default App;


