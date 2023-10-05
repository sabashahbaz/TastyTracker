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
                <>
                    <li class="nav-item fs-4">
                        <RecipeSearchBar setSearchedRecipes={setSearchedRecipes}/>
                    </li>

                    <li class="nav-item  me-4 fs-3 fs-4">
                    <a class="nav-link active" aria-current="page" href="food_log">My Food Log</a>
                    </li>

                    <li class="nav-item  me-4 fs-4">
                    <a class="nav-link active" aria-current="page" href="my_recipes">My Recipes</a>
                    </li>

                    <li class="nav-item  me-4 fs-4">
                    <a class="nav-link" href="/about_us">About Us</a>
                    </li>

                    <li class="nav-item  me-4 fs-4">
                    {/* <p>Welcome {currentUser} !</p> */}
                    </li>

                    <li class="nav-item me-2 fs-4">
                    <a><button type="button" class="btn btn-light btn-sm" onClick={logout}>Logout</button></a>
                    </li>
                </>
                ) 
                : ( //user is able to search for recipes without signing in
                    <>
                        <li class="nav-item fs-4 me-5 custom-search-bar">
                            <RecipeSearchBar setSearchedRecipes={setSearchedRecipes}/>
                        </li>
                    
                        <li class="nav-item fs-4 me-10 custom-about-us">
                        <a class="nav-link active text-dark" href="/about_us">About Us</a>
                        </li>

                        <li class="nav-item fs-4 custom-login">
                        <a class="nav-link text-dark" href="/login"><img src={login_button_image} alt="Login" width="40" height="40" /> Login </a>
                        </li>
                    </>
                )}
            </ul>
            </div>
        </div>
        </nav>                                     
)};
        


export default NavBar;

