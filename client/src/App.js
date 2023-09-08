import './App.css';
import React, { useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TdeeCalculator from './Components/TdeeCalculator';
import FoodLogger from './Components/FoodLogDashbordPage'

function App() {
  const [foodItems, setFoodItems] = useState([])

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>home page</div>} />
          <Route path="tdee_calculator" element={<TdeeCalculator />} />
          <Route path="food_blogger" element={<FoodLogger setFoodItems={setFoodItems}/>} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;


