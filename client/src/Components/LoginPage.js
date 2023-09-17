import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

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
        if (!currentUserResponse.error) navigate('/food_log')
        }

    console.log("Current user form login page", currentUser)

    return (
        <div>
            <form className= "login-page=container" onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="username input" class="form-label">Username</label>
                        <input type="text"
                                class="form-control" 
                                id="input username" 
                                aria-describedby="username"
                                onChange={handleChangeUsername}
                                placeholder=""
                                value={username}
                                />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" 
                                class="form-control" 
                                id="exampleInputPassword1"
                                onChange={handleChangePassword}
                                placeholder=""
                                value={password}
                                />
                    </div>
                    <button type="button" class="btn btn-secondary">Login</button>
                    {/* <button className="submit-button" type="submit">Login</button> */}
                    <Link to="/tdee_calculator"  class="nav-link fs-3">
                                new user? create an account!
                            </Link>
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