import React, { useState } from "react";

function TdeeCalculator({setCurrentTdee, calculate_tdee, create_account_tdee}) {


  // function calculate_TDEE (userInfo) 

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



// const [currentTdee, setCurrentTdee] = useState(0)

const heightOptions = [];
for ( let feet = 4; feet <= 7; feet++) {
for (let inches = 0; inches <= 11; inches ++) {
const heightInInches = feet * 12 + inches;
heightOptions.push({
    value: heightInInches.toString(),
    label: `${feet} ft  ${inches} in`
})}};

function handleSubmitTDEE(e) {
    e.preventDefault();
    setStep(2);
}

function handleSubmitAccountForm (e) {
    e.preventDefault();
    console.log("hey after submission")
    create_account_tdee({
        "gender": selectedGender,
        "age": Number(age),
        "weight": Number(weight),
        "height": Number(selectedHeight),
        "activity_level" : Number(selectedActivity),
        "first_name": firstName, 
        "last_name": lastName,
        "username": username, 
        "password": password })
    };

return (
<div className="tdde-form">

{step === 1 

        ? (
                <form className="form-containter" onSubmit={handleSubmitTDEE}> 
                    
                <h1>TDEE calculator</h1>
                <div>
                Gender  
                    <input 
                        type = "radio" 
                        // name = "male-button" 
                        value = {"male"}
                        onChange={(e) => setSelectedGender(e.target.value)}
                        checked={selectedGender === 'male'}
                        // onChange={handleGenderChange}
                        />
                    Male
                    <input type = "radio" 
                        // name = "female-button" 
                        value = {"female"}
                        onChange={(e) => setSelectedGender(e.target.value)}
                        checked={selectedGender ==='female'}
                        // onChange={handleGenderChange}
                        /> 
                    Female
                </div>
                <div className= "age-input">
                    Age:
                    <input
                    type="text"
                    name="age"
                    onChange={(e) => setAge(e.target.value)}
                    value={age}
                    // onChange={handleAgeChange}
                    />
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
    
        : (     
            <form className = "create-account-form" onSubmit={handleSubmitAccountForm}>
                <div className ="first-name-group">
                        <h2>first name</h2>
                        <input
                            className="first-name-input"
                            type="text"
                            onChange={handleChangeFirstName}
                            placeholder="enter first name"
                            value={firstName}
                        />
                    </div>
                    <div className ="last-name-group">
                        <h2>last name</h2>
                        <input
                            className="last-name-input"
                            type="text"
                            onChange={handleChangeLastName}
                            placeholder="enter last name"
                            value={lastName}
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
                    <button className="submit-button" type="submit"> create a new account</button>
                </form>
        )    
    } 
    </div>
    
    );
}
    
export default TdeeCalculator;


// function handleSubmit(e) {
// e.preventDefault();
// calculate_tdee({ 
// "gender": selectedGender,
// "age": Number(age),
// "weight": Number(weight),
// "height": Number(selectedHeight),
// "activity_level" : Number(selectedActivity)
// })
// };

// console.log(`Current TDEE:`)
// console.log(currentTdee)



// async function calculate_tdee(userInfo) {
//     console.log('user info', userInfo)
// fetch('/calculate_tdee', {
//     method: 'POST',
//     headers: {
//     'Content-Type': 'application/json',
//     'Accepts': 'application/json'
//     },
//     body: JSON.stringify(userInfo)
// })
// .then(response => response.json())
// .then(data => setCurrentTdee(data))
// .catch(error => {console.error('Error:', error);
// });
// }
    

{/* <form className="form-containter" onSubmit={handleSubmitTDEE}> 
    
    <h1>TDEE calculator</h1>
    <div>
    Gender  
        <input 
            type = "radio" 
            // name = "male-button" 
            value = {"male"}
            onChange={(e) => setSelectedGender(e.target.value)}
            checked={selectedGender === 'male'}
            // onChange={handleGenderChange}
            />
        Male
        <input type = "radio" 
            // name = "female-button" 
            value = {"female"}
            onChange={(e) => setSelectedGender(e.target.value)}
            checked={selectedGender ==='female'}
            // onChange={handleGenderChange}
            /> 
        Female
    </div>
    <div className= "age-input">
        Age:
        <input
        type="text"
        name="age"
        onChange={(e) => setAge(e.target.value)}
        value={age}
        // onChange={handleAgeChange}
        />
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
</form> */}
// </div>
// );













