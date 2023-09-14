import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function LoginPage({attemptLogin, currentUser, setCurrentUser}) {
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)

    function handleSubmit (e) {
        e.preventDefault();
        attemptLogin({"username": username, "password": password })
    }
    //     if (currentUser) {
    //         console.log('hellloooo')
    //         navigate('/food_dashboard')
    //     } else {alert("please try again")}    
    // }
    //     {currentUser 
    //         ?  (navigate('/food_dashboard'))
    //         : alert("Please try agan")}
    
    // const handleSubmit = async(e) => {
    //     e.preventDefault();
    //     try {
    //         await attemptLogin();
    //         navigate('/food_dashboard')
    //     } catch (error) {
    //         navigate('/')
    //     }
    // }

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

