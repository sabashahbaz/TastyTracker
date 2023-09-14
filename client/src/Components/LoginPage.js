import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function LoginPage({attemptLogin, currentUser, setCurrentUser}) {
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)

    async  function handleSubmit (e) {
        e.preventDefault();
        let currentUserResponse;
        await fetch('/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
            },
            body: JSON.stringify({"username": username, "password": password })
        })
        .then(response => response.json())
        .then(data => {
            currentUserResponse = data;
            setCurrentUser(data);
            // navigate('/');
        });
        console.log("from login page", currentUserResponse);
        if (!currentUserResponse.error) navigate('/')
        }

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

  // if (currentUser) {
        //             console.log('hellloooo')
        //             navigate('/food_dashboard')
        //         } else {alert("please try again")}    
        //     }
    
    //     if (currentUser) {
    //         console.log('hellloooo')
    //         navigate('/food_dashboard')
    //     } else {alert("please try again")}    
    // }
        // {currentUser && (navigate('/food_dashboard'))}
            // : alert("Please try agan")}
    
    // const handleSubmit = async(e) => {
    //     e.preventDefault();
    //     try {
    //         await attemptLogin();
    //         navigate('/food_dashboard')
    //     } catch (error) {
    //         navigate('/')
    //     }
    // }



        // // // async function attemptLogin({"username": username, "password": password })
        // // navigate('/')
        // // attemptLogin (userInfo) {
        //     fetch('/login', {
        //         method: 'POST',
        //         headers: {
        //         'Content-Type': 'application/json',
        //         'Accepts': 'application/json'
        //         },
        //         body: JSON.stringify({"username": username, "password": password })
        //     })
        //         .then(response => response.json())
        //         .then(data => setCurrentUser(data))
        //         // .then(() => { if (currentUser){navigate('/')}})
            
                
        



     //make this return a promoise so you can .then(if currentuser)