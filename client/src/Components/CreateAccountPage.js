import React, {useState} from "react";

function CreateAccountPage ({createAccount}) {

    const [isAccountCreated, setIsAccountCreated] = useState(false);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)

    function handleSubmit(e) {
        e.preventDefault();
        createAccount({ "username": username, "password": password });
        setIsAccountCreated(true)
        createAccountAlert()
    }

    function createAccountAlert(e) {
        if (isAccountCreated) {
            alert("Account was created successfully!")
        } else {
            alert("Please try again ")
        }
    }

    return (
        <div>
            <form className = "create-account-form" onSubmit={handleSubmit}>
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
                <button className="submit-button" type="submit"> create a new account</button>
            </form>
        </div>
    )
}

export default CreateAccountPage;