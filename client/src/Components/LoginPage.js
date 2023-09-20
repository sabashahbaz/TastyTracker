import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import welcomepage from "../CSS/loginpage.css"

function LoginPage({setCurrentTdee, currentUser, setCurrentUser}) {
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)

    async  function handleSubmit (e) {
        e.preventDefault();
        // console.log(username, password)
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
            setCurrentTdee(data.user.tdee)

        });
        if (!currentUserResponse.error) navigate('/food_log')
        }



    return (
        <div className="container d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle">
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
                        <button type="submit" className="btn btn-primary w-100 fs-5">Login</button>
                    </div>
                    <div className="col-6">
                        <Link to="/tdee_calculator" className="nav-link fs-5">
                            <p>New user? Create an account!</p>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}


export default LoginPage;
