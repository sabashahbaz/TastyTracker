import React from "react";
import {Link} from 'react-router-dom';
import background from "../assets/background.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import welcomepage from "../CSS/welcomepage.css"

function Welcome() {
    return (
        <div className="welcome-container d-flex align-items-center">
        <div className="bg-img">
            {/* Your image content */}
            {/* <img className="bg obj-fit-cover" src="https://t4.ftcdn.net/jpg/02/99/31/07/360_F_299310701_KJn20TurXr4q9lrnKH3oRmlLGFvwq8k1.jpg" alt="cute kitty" /> */}
            <div class="position-absolute top-50 end-0 translate-middle-y" >
                <h2>Keep track of what you eat while eating that you love</h2>
                <h4>Get everything you need to maek amazing meals and keeping up with your body goals</h4>
            </div>
            <Link to="login">
                <button type="button" class="btn btn-light position-absolute top-100 end-0 translate-middle-y">Get Started Today!</button>
            </Link>
            
        </div>
    </div>
    );
}
export default Welcome;

//https://st2.depositphotos.com/1013886/5744/i/450/depositphotos_57444285-Healthy-food-background.jpg