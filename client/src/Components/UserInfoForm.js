import React from "react";
import {Link} from 'react-router-dom';

function UserInfoForm({setStep, handleSubmitUserInfo, firstName, setFirstName, lastName, setLastName, username, setUsername, password, setPassword}) {

     //allow user to proceed to the next part of the form after filling out user info
    function handleSubmitUserInfo(e) {
        e.preventDefault();
        if (firstName && lastName && username && password)  {
            setStep(2);
        } else {
            alert("Please complete all required fields") //make sure all required fields are completed 
        }  
    };

    //function to handle change on form 
    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)
    const handleChangeFirstName = e => setFirstName(e.target.value)
    const handleChangeLastName = e => setLastName(e.target.value)

    return (
        <form className="create-account-container w-50" onSubmit={handleSubmitUserInfo}>
                    <div className="header text-center">
                        <h2>Create your Account</h2>
                        <p>To keep track of your food and view saved recipies</p>
                    </div>
                    <div className="mb-3 p-2">
                            <label className="first-name-label">First Name:</label>
                            <input
                                type="text"
                                size="20"
                                className="form-control w-100"
                                id="inputFirstname"
                                aria-describedby="firstname"
                                onChange={handleChangeFirstName}
                                placeholder=""
                                value={firstName}
                            />
                        </div>
                        <div className="mb-3 p-2">
                            <label className="last-name-label">Last Name:</label>
                            <input
                                type="text"
                                size="20"
                                className="form-control w-100"
                                id="inputLastname"
                                aria-describedby="lastname"
                                onChange={handleChangeLastName}
                                placeholder=""
                                value={lastName}
                            />
                        </div>
                        <div className="mb-3 p-2">
                            <label className="username-label">Username:</label>
                            <input
                                type="text"
                                size="20"
                                className="form-control w-100"
                                id="inputusername"
                                aria-describedby="username"
                                onChange={handleChangeUsername}
                                placeholder=""
                                value={username}
                            />
                        </div>
                        <div className="mb-3 p-2">
                            <label className="password-label"> Password:</label>
                            <input
                                type="password"
                                size="20"
                                className="form-control w-100"
                                id="inputpasswordname"
                                aria-describedby="password"
                                onChange={handleChangePassword}
                                placeholder=""
                                value={password}
                            />
                        </div>
                        <button className="btn btn-success w-100 mb-2" type="submit"> Create your Account</button>
                        <Link to="/login"><small className="text-muted fs-6"> Already have an account? Click here to sign in  </small></Link>
                
                    </form>
    )
}
export default UserInfoForm;