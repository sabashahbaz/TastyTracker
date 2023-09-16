import React from "react";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'

function Welcome () {


    return (
        <div>
            <Link to='/tdee_calculator'><button>Create an Account</button></Link>
            <Button>test</Button>
        </div>
    )
}

export default Welcome;