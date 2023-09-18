import React, {useState} from "react";

function CreateAccountPage ({createAccount}) {

    const [isAccountCreated, setIsAccountCreated] = useState(false);

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)

    function handleSubmit(e) {
        e.preventDefault();
        createAccount({ 
            "username": username, 
            "password": password });
        setIsAccountCreated(true)
        createAccountAlert()
    }

    function createAccountAlert(e) {
        if (!isAccountCreated) {
            alert("Account was created successfully!")
        } else {
            alert("Please try again ")
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <form className="login-page-container w-50" onSubmit={handleSubmit}>
            <div className="mb-3 p-2">
                    <label className="first-name-label">First handleChangeFirstName</label>
                    <input
                        type="text"
                        size="20"
                        className="form-control w-100"
                        id="inputUsername"
                        aria-describedby="username"
                        onChange={handleChangeUsername}
                        placeholder="enter your name"
                        value={username}
                    />
                </div>
                <div className ="username-group">
                    <h2>last name</h2>
                    <input
                        className="username-input"
                        type="text"
                        onChange={handleChangeUsername}
                        placeholder="Create a username!"
                        value={username}
                    />
                </div>
                <div className ="username-group">
                    <h2>Username</h2>
                    <input
                        className="username-input"
                        type="text"
                        onChange={handleChangeUsername}
                        placeholder="Create a username!"
                        value={username}
                    />
                </div>
                <div className ="password-group">
                    <h2>Password</h2>
                    <input
                        className="password-input"
                        type="text"
                        onChange={handleChangePassword}
                        placeholder="Create a password!"
                        value={password}
                    />
                </div>
                <button className="submit-button" type="submit"> create a unt</button>
            </form>
        </div>
    )
}

export default CreateAccountPage;