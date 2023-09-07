import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

function App() {


  // function calculate_TDEE (userInfo) 

  const [selectedGender, setSelectedGender] = useState("");
  const [age, setAge] = useState("")
  const [selectedHeight, setSelectedHeight] = useState(""); 
  const [weight, setWeight] = useState("")
  const [selectedActivity, setSelectedActivity] = useState("Sedentary (little or no exercise)")
  const [currentTdee, setCurrentTdee] = useState(0)

  // console.log(`Current Gender: ${selectedGender}`)
  // console.log(`Current Age: ${setAge}`)
  // console.log(`Current Age: ${age}`)
  // console.log(`Current Height: ${setSelectedHeight}`)
  // console.log(`Current weight: ${setWeight}`)
  // console.log(`Current avitivity: ${setSelectedActivity}`)


function handleGenderChange (e) {
    setSelectedGender(e.target.value)
    console.log(`Current Gender: ${selectedGender}`)
  }

function handleAgeChange (e) {
  setAge(e.target.value)
  console.log(`Current Age: ${age}`)
}

function handleHeightChange (e) {
  setSelectedHeight(e.target.value); 
  console.log(`Current Height: ${selectedHeight}`)
};

function handleWeightChange(e) {
  setWeight(e.target.value)
  console.log(`Current Weight: ${weight}`)
}

function handleActivityChange(e) {
  setSelectedActivity(e.target.value)
}

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
    "gender": "male",
    "age": 24,
    "weight": 145,
    "height": 60,
    "activity_level" : 2
    })
  setCurrentTdee(currentTdee + 1)
  console.log(`Current TDEE:`)
  console.log(currentTdee)
};

function calculate_tdee(userInfo) {
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
            // value={age}
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
            name="acvitivity"
            onChange={(e) => setWeight(e.target.value)}
            value={selectedActivity}
            // onChange={handleActivityChange}
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Lightly active (light exercise or sports 1-3 days a week)</option>
            <option value="moderate">Moderately active (moderate exercise or sports 3-5 days a week)</option>
            <option value="active">Very active (hard exercise or sports 6-7 days a week)</option>
            <option value="extra-active">Super active (very hard exercise, physical job, or training)</option>
          </select>
      
      </div>
      <input className="submit-button" type="submit" value="calculate" />
    </form>
    </div>
  );
}

export default App;


