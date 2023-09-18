import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

function LoginPage({setCurrentTdee, currentUser, setCurrentUser}) {
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
            setCurrentTdee(data.tdee)
            // navigate('/');
        });
        if (!currentUserResponse.error) navigate('/food_log')
        }



    return (
        <div className="container d-flex justify-content-center align-items-center">
            <form className="login-page-container w-50" onSubmit={handleSubmit}>
                <div className="mb-3 p-2">
                    <label htmlFor="inputUsername" className="form-label">Username</label>
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
                    <label htmlFor="inputPassword" className="form-label">Password</label>
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
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </div>
                    <div className="col-6">
                        <Link to="/tdee_calculator" className="nav-link fs-6">
                            <p>New user? Create an account!</p>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}


export default LoginPage;
