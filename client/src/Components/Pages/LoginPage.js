import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import CSS from "../../CSS/loginpage.css"

//login page
function LoginPage({setCurrentTdee, setTotalCaloriesIAte, setCurrentUser}) {
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)

    //submit login function 
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
            console.log(data)
            currentUserResponse = data;
            setCurrentUser(data);
            setCurrentTdee(data.user.tdee)
            setTotalCaloriesIAte(data.new_day_calories.total_daily_calories_eaten)
        });
        if (!currentUserResponse.error) navigate('/food_log')
    };

    return ( //login form 
        <div className="login-page"> 
            <div className="d-flex " style={{ height: '700px', width: '100%' }}>
            <form className="login-page-container " onSubmit={handleSubmit}>
                <div className="mb-3 p-2 custom-username">
                    <label htmlFor="inputUsername" className="username-label fs-3 ">Username:</label>
                    <input
                        type="text"
                        size="20"
                        className="form-control w-50 custom-input"
                        id="inputUsername"
                        aria-describedby="username"
                        onChange={handleChangeUsername}
                        value={username}
                    />
                </div>
                <div className="mb-3 p-2 custom-password">
                    <label htmlFor="inputPassword" className="password-label fs-3 ">Password:</label>
                    <input
                        type="password"
                        className="form-control w-50 custom-input"
                        id="inputPassword"
                        onChange={handleChangePassword}
                        value={password}
                    />
                </div>
                    <button type="submit" className="login-button">Login</button>
                    <div className="message">
                        <a href="/create_account" class="my-link">New user? Click here!</a>
                    </div>
            </form>
        </div>
    </div>
    );
};

export default LoginPage;
