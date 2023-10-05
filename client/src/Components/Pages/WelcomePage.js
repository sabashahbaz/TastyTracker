import React from "react";
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import welcomepage from "../../CSS/welcomepage.css"

// Welcome page 
function Welcome() {
    return (
        <div className="bg-img">
            <div className="welcome-page-container">
                <div className="welcome-box">
                    <div className="title">
                        <h2>🥗 TastyTracker 🥗</h2>
                    </div>
                    <div className="welcome-page-text" >
                        <h2 className="header">Keep track of what you eat while eating that you love</h2>
                        <div className="text-body">
                            <h4>Get everything you need to make amazing meals and keeping up of your body goals</h4>
                        </div>
                    </div>
                    <div className="get-started">
                        <Link to="login">
                            <button className="button">Get Started Today!</button>
                        </Link>
                    </div>
                </div>

            </div>     
        </div>
    );
}
export default Welcome;
