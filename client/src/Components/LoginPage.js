import React, {useState} from 'react';

function LoginPage({attemptLogin}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)

    function handleSubmit(e) {
        e.preventDefault();
        attemptLogin({"username": username, "password": password })
        createLoginAlert()
    }

    function createLoginAlert(e) {
        if (!isLoggedIn) {
            alert("Logged in successfully!")
        } else {
            alert("Please try again ")
        }
    }


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
                    <button className="submit-button" type="submit"> login</button>
            </form>
        </div>
    )
}

export default LoginPage;