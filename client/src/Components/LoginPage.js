import React from 'react';

function LoginPage({attemptLogin}) {

    return (
        <div>
            <form className= "login-page=container">
                <div className ="username-group">
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
                    <button className="submit-button" type="submit"> create a new account</button>
            </form>
        </div>
    )
}

export default LoginPage()