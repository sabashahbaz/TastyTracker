import React, {useState} from 'react';
import { Outlet} from 'react-router-dom';

function MyRecipesPage () {

//where the recipies are saved 

    return (
        <div>

<nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="/my_recipes/breakfast">Breakfast</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/my_recipes/lunch">Lunch</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/my_recipes/dinner">Dinner</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="/my_recipes/dessert">Dessert</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="/my_recipes/drinks">Drinks</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="/my_recipes/appetizers">Appetizers</a>
                </li>
                </ul>
            </div>
        </nav>
        <Outlet />
        </div>
        
    )
}

export default MyRecipesPage;