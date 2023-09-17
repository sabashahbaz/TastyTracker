import React from "react";
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Welcome () {


    return (
        <div>
            <Link to='/tdee_calculator'><button>Get Started Today!</button></Link>
        </div>
    )
}

export default Welcome;