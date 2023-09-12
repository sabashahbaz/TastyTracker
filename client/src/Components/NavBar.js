import React from "react";
import {Link} from 'react-router-dom';
import UserDetails from './CurrentDetails';

function NavBar ({ currentUser, logout}) {

    return (
    
        <div className = "nav-bar-container">
            <Link to="/" className="logo">the logo</Link>
            <div>
                { currentUser?.username?.length > 0
                ? (
                    <div>
                        <UserDetails currentUser={currentUser} logout={logout}/>
                    </div>
                )
                : (
                    <div>
                    <Link to='/create_account'><button>Create an Account</button></Link>
                    <Link to='/login'><button >Login</button></Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavBar;