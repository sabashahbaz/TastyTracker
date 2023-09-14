import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function LoginPage({attemptLogin, currentUser, setCurrentUser}) {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     attemptLogin({"username": username, "password": password })
    //     .then((isSuccess) => {
    //         if(isSuccess) {
    //             history.pushState('food_dashboard');
    //         } else {
    //             alert("login failed. Pelase try again")
    //         }
    //     })
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(! username || !password) return;
        attemptLogin({"username": username, "password": password })
        setCurrentUser({username: username, password: password})
        navigate('/food_dashboard')
    }


    // function createLoginAlert(isSuccess) {
    //     if (isSuccess) {
    //         alert("Logged in successfully!")
    //     } else {
    //         alert("please try again");
    //     }
    // }

    // function createLoginAlert(e) {
    //     if (isLoggedIn === true) {
    //         alert("Logged in successfully!")
    //     } else {
    //         alert("Please try again ")
    //     }

    console.log("Current user form login page", currentUser)

    return (
        <div>
            <form className= "login-page=container" onSubmit={handleSubmit}>
                <div className ="username-group">
                    <p>login page</p>
                        <h2>Username</h2>
                        <input
                            className="username-input"
                            type="text"
                            onChange={handleChangeUsername}
                            placeholder="enter username!"
                            value={username}
                        />
                    </div>
                    <div className ="password-group">
                        <h2>Password</h2>
                        <input
                            className="password-input"
                            type="text"
                            onChange={handleChangePassword}
                            placeholder="enter a password!"
                            value={password}
                        />
                    </div>
                    {/* <Link to='/food_dashboard'><button className="submit-button" type="submit"> login</button></Link> */}
                    <button className="submit-button" type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage;

{/* <div>
{currentUser ? (
<Link to="/food_dashboard">
    <button className="submit-button" type="submit">
    Login
    </button>
</Link>
) : (
<button className="submit-button" type="submit">
    Login
</button>
)}
</div> */}