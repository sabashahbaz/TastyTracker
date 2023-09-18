import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

function TdeeCalculator({currentTdee, setCurrentUser, setCurrentTdee, calculate_tdee, create_account_tdee}) {

const navigate = useNavigate();

const [selectedGender, setSelectedGender] = useState("");
const [age, setAge] = useState("")
const [selectedHeight, setSelectedHeight] = useState(""); 
const [weight, setWeight] = useState("")
const [selectedActivity, setSelectedActivity] = useState(1)
const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [step, setStep] = useState(1)

const handleChangeUsername = e => setUsername(e.target.value)
const handleChangePassword = e => setPassword(e.target.value)
const handleChangeFirstName = e => setFirstName(e.target.value)
const handleChangeLastName = e => setLastName(e.target.value)

const heightOptions = [];
for ( let feet = 4; feet <= 7; feet++) {
for (let inches = 0; inches <= 11; inches ++) {
const heightInInches = feet * 12 + inches;
heightOptions.push({
    value: heightInInches.toString(),
    label: `${feet} ft  ${inches} in`
})}};

function handleSubmitUserInfo(e) {
    e.preventDefault();
    if (firstName && lastName && username && password)  {
        setStep(2);
    } else {
        alert("Please complete all required fields")
    }
    
}

async function handleSubmitAccountForm (e) {
    e.preventDefault();
    let accountResponse;
    await fetch('/create_account', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
        },
        body: JSON.stringify({
            "gender": selectedGender,
            "age": Number(age),
            "weight": Number(weight),
            "height": Number(selectedHeight),
            "activity_level" : Number(selectedActivity),
            "first_name": firstName, 
            "last_name": lastName,
            "username": username, 
            "password": password })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        accountResponse= data;
        setCurrentUser(data.user.username)
        setCurrentTdee(data.user.tdee)
    });
    if (accountResponse) navigate('/food_log')
    // .catch(error => {console.log("front-end is broken", error)})  
    };

    console.log(currentTdee)

return (

<div className="container d-flex justify-content-center align-items-center">

{step === 1 

        ? (
            <form className="create-account-container w-50" onSubmit={handleSubmitUserInfo}>
            <div className="header text-center">
                <h2>Create your Account</h2>
                <p>To keep track of your food and view saved recipies</p>
            </div>
            <div className="mb-3 p-2">
                    <label className="first-name-label">First Name</label>
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
                    <label className="last-name-label">Last Name</label>
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
                    <label className="username-label">Username</label>
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
                    <label className="password-label"> Password</label>
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
                <button className="btn btn-primary w-100" type="submit"> Create your Account</button>
            </form>
        )
    
        : (   
            <form className="tdee-calculator-container w-50" onSubmit={handleSubmitAccountForm}>
            <div className="header text-center">
                <h2>Calculate Total Daily Energy Expenditure (TDEE)</h2>
                <p>This TDEE calculator tool calculates your daily calories burned to help you achieve your goal weight</p>
            </div>
            <div className="d-flex">
                <div className="form-check form-check-inline ">
                    <label>Gender :</label>
                </div>
                <div className="d-flex">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            value="male"
                            onChange={(e) => setSelectedGender(e.target.value)}
                            checked={selectedGender === 'male'}
                        />
                        <label className="form-check-label" for="inlineRadio1" htmlFor="flexRadioDefault1">
                            Male
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            value="female"
                            onChange={(e) => setSelectedGender(e.target.value)}
                            checked={selectedGender === 'female'}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Female
                        </label>
                    </div>
                </div>
            </div>
            <div className="d-flex w-100">
                <div className="form-check form-check-inline">
                Age:
                <input
                type="text"
                size="20"
                className="form-control w-100"
                id="inputage"
                aria-describedby="username"
                onChange={(e) => setAge(e.target.value)}
                value={age}
                // onChange={handleAgeChange}
                />
                </div>
            </div>
            <div className = "height-input">
                Height:
                <select
                name="height"
                value={selectedHeight}
                onChange={(e) => setSelectedHeight(e.target.value)}
                // size="10"
                >
                <option value="">Select Height</option>
                {heightOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                ))}
                </select>
            </div>

            <div className= "weight-input">
                Weight:
                <input
                type="text"
                name="weight"
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
                />
            </div>

            <div className = "activity-input">

                Activity Level
                <select
                name="activity"
                onChange={(e) => setSelectedActivity(e.target.value)}
                // defaultValue="1"
                // onChange={handleActivityChange}
                >
                <option value="1">Sedentary (little or no exercise)</option>
                <option value="2">Lightly active (light exercise or sports 1-3 days a week)</option>
                <option value="3">Moderately active (moderate exercise or sports 3-5 days a week)</option>
                <option value="4">Very active (hard exercise or sports 6-7 days a week)</option>
                <option value="5">Super active (very hard exercise, physical job, or training)</option>
                </select>

            </div>
            <input className="submit-button" type="submit" value="calculate" />
            </form>   
        )    
    } 
    </div>
    
    );
}
    
export default TdeeCalculator;

