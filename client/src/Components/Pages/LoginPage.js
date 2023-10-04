import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import CSS from "../../CSS/loginpage.css"



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
        }

    return (
        <div className="login-page">
            <div className="d-flex " style={{ height: '700px', width: '100%' }}>
            <form className="login-page-container w-50" onSubmit={handleSubmit}>
                <div className="mb-3 p-2">
                    <label htmlFor="inputUsername" className="username-label fs-2 ">Username</label>
                    <input
                        type="text"
                        size="20"
                        className="form-control w-100"
                        id="inputUsername"
                        aria-describedby="username"
                        onChange={handleChangeUsername}
                        value={username}
                    />
                </div>
                <div className="mb-3 p-2">
                    <label htmlFor="inputPassword" className="password-label fs-2">Password</label>
                    <input
                        type="password"
                        className="form-control w-100"
                        id="inputPassword"
                        onChange={handleChangePassword}
                        value={password}
                    />
                </div>
                <div className="row p-2">
                    <div className="col-6">
                        <button type="submit" className="btn btn-success w-100 fs-5">Login</button>
                    </div>
                    <div className="col-6">
                        <Link to="/create_account"><small className="text-muted fs-6"> New user? Create an account!  </small></Link>
                    </div>
                </div>
            </form>
        </div>


        </div>
    
    );
}


export default LoginPage;
