import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import RecipeSearchBar from "./RecipeComponents/RecipeSearchBar";
import login_button_image from '../assets/person-circle.svg';
import logo from "../assets/Picture1.png";
import CSS from "../CSS/NavBar.css";

// navbar 
function NavBar ({ currentUser, setSearchedRecipes, setCurrentUser, logout}) {
    const navigate = useNavigate();

    //logout function 
    function logout () {
        fetch('/logout', {method: 'DELETE'})
        .then(response => {
            if(response.ok) {setCurrentUser(null)}  navigate('/')})
        };

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid ">
            {currentUser // if user is present -> logo will redirect to foodlog, or else to the welcome page
            ? ( 
                <Link to="/food_log" className="navbar-brand"><img src={logo} alt="tasty tracker logo" className="logo" width="320" height="100" /></Link>
            ): (
                <Link to="/" className="navbar-brand"><img src={logo} alt="tasty tracker logo" className="logo" width="320" height="100" /></Link>
            )}
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end " id="navbarNav">
            <ul class="navbar-nav custom-ul">
                {currentUser  // when user is present -> show saved recipes, foodlog and logout tabs
                ? (
                <div className = "nav-user">
                    <li className="custom-user-search-bar">
                        <RecipeSearchBar setSearchedRecipes={setSearchedRecipes}/>
                    </li>

                    <li className="user-food-log-tab">
                    <a class="nav-link active" aria-current="page" href="food_log">My Food Log</a>
                    </li>

                    <li className="user-recipe-tab">
                    <a class="nav-link active" aria-current="page" href="my_recipes">My Recipes</a>
                    </li>

                    <li className="user-about-us">
                    <a class="nav-link active" href="/about_us">About Us</a>
                    </li>

                    <li className="logout">
                    <a><button type="button" className="logout-button" onClick={logout}>Logout</button></a>
                    </li>
                </div>
                ) 
                : ( //user is able to search for recipes without signing in
                    <div className = "nav-no-user">
                        <div className = "search-no-user" >
                            <li class="custom-search-bar">
                                <RecipeSearchBar setSearchedRecipes={setSearchedRecipes}/>
                            </li>
                        </div>
                    
                        <div className = "about-no-user">
                            <li class="custom-about-us">
                            <a class="nav-link active text-dark" href="/about_us">About Us</a>
                            </li>
                        </div>

                        <div className = "login-no-user">
                            <li class="custom-login">
                            <a class="nav-link text-dark" href="/login"><img src={login_button_image} alt="Login" width="40" height="40" /> Login </a>
                            </li>
                        </div>
                    </div>
                )}
            </ul>
            </div>
        </div>
    </nav>                                     
)};

export default NavBar;

