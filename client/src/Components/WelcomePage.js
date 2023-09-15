import React from "react";
import {Link} from 'react-router-dom';

function Welcome () {


    return (
        <div>
            <Link to='/tdee_calculator'><button>Create an Account</button></Link>
        </div>
    )
}

export default Welcome;