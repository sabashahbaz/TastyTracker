import React, { useState } from "react";

function TdeeCalculator() {


  // function calculate_TDEE (userInfo) 

const [selectedGender, setSelectedGender] = useState("");
const [age, setAge] = useState("")
const [selectedHeight, setSelectedHeight] = useState(""); 
const [weight, setWeight] = useState("")
const [selectedActivity, setSelectedActivity] = useState(1)
const [currentTdee, setCurrentTdee] = useState(0)

const heightOptions = [];
for ( let feet = 4; feet <= 7; feet++) {
for (let inches = 0; inches <= 11; inches ++) {
const heightInInches = feet * 12 + inches;
heightOptions.push({
    value: heightInInches.toString(),
    label: `${feet} ft  ${inches} in`
})
}
}


function handleSubmit(e) {
e.preventDefault();
calculate_tdee({ 
"gender": selectedGender,
"age": Number(age),
"weight": Number(weight),
"height": Number(selectedHeight),
"activity_level" : Number(selectedActivity)
})
setCurrentTdee(prevState => prevState + 1)

};
console.log(`Current TDEE:`)
console.log(currentTdee)

function calculate_tdee(userInfo) {
    console.log('user info', userInfo)
// console.log("cowabunga")
// console.log(userInfo)
// console.log("cowabunga, but a string")
// console.log(JSON.stringify(userInfo))
fetch('/calculate_tdee', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Accepts': 'application/json'
    },
    body: JSON.stringify(userInfo)
})
.then(response => response.json())
.then(data => setCurrentTdee(data))
.catch(error => {
    console.error('Error:', error);
    // Handle the error, e.g., show an error message to the user
});
}

return (
<div className="tdde-form">
<form className="form-containter" onSubmit={handleSubmit}> 
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
</div>
);
}

export default TdeeCalculator;