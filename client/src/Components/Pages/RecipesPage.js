import React from 'react';
import RecipesNavbar from '../RecipeComponents/RecipesNavbar';
import BreakfastRecipes from '../RecipeComponents/BreakfastRecipes';
import { Outlet } from 'react-router-dom';

function RecipesPage() {
    return (
        <div>
            <RecipesNavbar />
        </div>
    )
}

export default RecipesPage;