import React from "react";
import {Link} from 'react-router-dom';
import logo from "../assets/Picture1.png";
import background from "../assets/background.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import welcomepage from "../CSS/welcomepage.css"


function Welcome() {
    return (
        <div className="welcome-container d-flex align-items-center">
        <div className="bg-img">
            <h2 className="title">TastyTracker 🥗</h2>
            <div className="welcome-page-text" >
                <h2>Keep track of what you eat while eating that you love</h2>
                <h4>Get everything you need to make amazing meals and keeping up with your body goals</h4>
            </div>
            <Link to="login">
                <button type="button" class="get-started-button">Get Started Today!</button>
            </Link>
            
        </div>
    </div>
    );
}
export default Welcome;

//https://st2.depositphotos.com/1013886/5744/i/450/depositphotos_57444285-Healthy-food-background.jpg