import React from "react";
import {Link} from 'react-router-dom';
// import UserDetails from './UserDetails';
import login_button_image from "../assets/person-circle.svg";
import logo from "../assets/logo.png";
function NavBar ({ currentUser, logout}) {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/welcome" className="navbar-brand">
                    <img src={logo} alt="tasty tracker logo" className="logo" width="150" height="150" />
                </Link>
                {/* <div class="collapse navbar-collapse justify-content-right" id="navbarSupportedContent"></div> */}
                <button
                    className="navbar-toggler" //when screen size is reduced, change visibility 
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item me-4">
                            <Link to="/food_log" className="nav-link" class="nav-link fs-3">
                                My Food Log
                            </Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link to="/recipes" className="nav-link" class="nav-link fs-3">
                                Recipes
                            </Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link to="/about" className="nav-link" class="nav-link fs-3">
                                About Us
                            </Link>
                        </li>
                        <li className="nav-item me-4"> {/* Use ml-auto to push this item to the right */}
                            {currentUser?.username?.length > 0 ? (
                                    <li className="nav-item me-3">
                                    <div className="d-flex align-items-center">
                                    <span className="nav-link fs-3 me-2">Welcome {currentUser.first_name}! </span>
                                    {/* <UserDetails  /> */}
                                    <button onClick={logout}>Logout</button>
                                    </div>
                                </li>
                            ) : (
                                <Link to="/login" className="nav-link" class="nav-link fs-3" >
                                    <img src={login_button_image} alt="Login" width="40" height="40" /> 
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}



export default NavBar;