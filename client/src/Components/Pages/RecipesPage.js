import React from 'react';
import RecipesNavbar from '../RecipeComponents/RecipesNavbar';
import BreakfastRecipes from '../RecipeComponents/BreakfastRecipes';
import { Outlet } from 'react-router-dom';

function RecipesPage() {
    return (
        <div>
            <RecipesNavbar />
            {/* <Route path='breakfast' element={<BreakfastRecipes recipes={recipes}  />} />
            <Route path='lunch' element={<LunchRecipes recipes={recipes}  />} />
            <Route path='dinner' element={<DinnerRecipes recipes={recipes} />} />
            <Route path='dessert' element={<DessertRecipes recipes={recipes} />} />
            <Route path='drinks' element={<DrinksRecipes recipes={recipes} />} />
            <Route path='appetizers' element={<AppetizersRecipes recipes={recipes} />} /> */}
        </div>
    )
}

export default RecipesPage;