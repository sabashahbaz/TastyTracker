import React from "react";
import {Link} from 'react-router-dom';
import CSS from "../CSS/userform.css"


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
        <form className="create-account-container" onSubmit={handleSubmitUserInfo}>
            <div className="user-info-container">
            <div className="header custom-header">
                <div className="header-text">
                    <h3>Create Account</h3>
                </div>
                <div className="header-body">
                    <p>To keep track of your food and view saved recipies</p>
                </div>
            </div>
            <div className="user-form-content ">
            <div className="user-input">
                    <label className="user-label">First Name:</label>
                    <input
                        type="text"
                        className="first-name"
                        onChange={handleChangeFirstName}
                        placeholder="first name"
                        value={firstName}
                    />
            </div>
            <div className="user-input">
                    <label className="">Last Name:</label>
                    <input
                        type="text"
                        size="20"
                        className=""
                        onChange={handleChangeLastName}
                        placeholder="last name"
                        value={lastName}
                    />
            </div>
            <div className="user-input">
                <label className="">Username:</label>
                <input
                    type="text"
                    className=""
                    onChange={handleChangeUsername}
                    placeholder="must be unique"
                    value={username}
                />
            </div>
            <div className="password-input">
                <label className=""> Password:</label>
                <input
                    type="password"
                    onChange={handleChangePassword}
                    placeholder="password"
                    value={password}
                />
            </div>
            <button className="account-button" type="submit"> submit user info</button>
            <div className="message">
                {/* <Link to="/login"><small className="text-muted fs-6"> Already have an account? Click here!  </small></Link> */}
                <a href="/login" class="my-link">Already have an account? Login here!</a>
            </div>
                
            </div>
        </div>
    </form>
    )
}
export default UserInfoForm;