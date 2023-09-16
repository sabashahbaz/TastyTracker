import React from "react";
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Welcome () {


    return (
        <div>
            <Link to='/tdee_calculator'><button>Create an Account</button></Link>
            <button className="btn btn-light">Click me</button>
        </div>
    )
}

export default Welcome;