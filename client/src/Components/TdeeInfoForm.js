import React from 'react'
import CSS from "../CSS/tdeeform.css"

//form user inputs information for TDEE
function TdeeInfoForm ({handleSubmitAccountForm, setAge, age, setSelectedActivity, selectedActivity, setSelectedGender, selectedGender, selectedHeight, setSelectedHeight, setWeight, weight}){

    //height range user can select from 
    const heightOptions = [];
    for ( let feet = 4; feet <= 7; feet++) {
    for (let inches = 0; inches <= 11; inches ++) {
    const heightInInches = feet * 12 + inches;
    heightOptions.push({
        value: heightInInches.toString(),
        label: `${feet} ft  ${inches} in`
    })}};

    return (
        <form className="tdee-calculator-container" onSubmit={handleSubmitAccountForm}>
            <div className="tdee-container">
                <div className="tdee-text-header">
                    <div className="tdee-header-text">
                        <h4>Calculate Total Daily Energy Expenditure (TDEE)</h4>
                    </div>
                    <div className="tdee-header-body">
                        <p className="p">total calories your body burns</p>
                    </div>
                </div>
            <div className="tdee-form-content">
                <div className="tdee-input">
                    <label>Gender: </label>
                    <div className="male">
                        <input
                            type="radio"
                            value="male"
                            onChange={(e) => setSelectedGender(e.target.value)}
                            checked={selectedGender === 'male'}
                        />
                        <label className="male-label" htmlFor="flexRadioDefault1">
                            Male
                        </label>
                    </div>
                    <div className="female">
                        <input
                            type="radio"
                            value="female"
                            onChange={(e) => setSelectedGender(e.target.value)}
                            checked={selectedGender === 'female'}
                        />
                        <label className="female-label" htmlFor="flexRadioDefault2">
                            Female
                        </label>
                    </div>
                </div>
                <div className="tdee-input">
                    <label>Age: </label>
                        <input
                        type="text"
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
                        placeholder="enter age"
                        />
                </div>
                <div className="tdee-input">
                <label>Height: </label>
                    <select
                    name="height"
                    value={selectedHeight}
                    onChange={(e) => setSelectedHeight(e.target.value)}
                    >
                    <option className="height-placeholder">select height</option>
                    {heightOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </div>
                <div className= "tdee-input">
                <label className="">Weight: </label>
                    <input
                    type="text"
                    placeholder="enter weight"
                    name="weight"
                    onChange={(e) => setWeight(e.target.value)}
                    value={weight}
                    />
                </div>
                <div className = "tdee-input">
                <label className="">Activity: </label>
                    <select
                    name="acitivity level"
                    value={selectedActivity}
                    placeholder='Select Activity'
                    onChange={(e) => setSelectedActivity(e.target.value)}
                    >
                    <option value="1">Sedentary (little or no exercise)</option>
                    <option value="2">Lightly active (light exercise or sports 1-3 days a week)</option>
                    <option value="3">Moderately active (moderate exercise or sports 3-5 days a week)</option>
                    <option value="4">Very active (hard exercise or sports 6-7 days a week)</option>
                    <option value="5">Super active (very hard exercise, physical job, or training)</option>
                    </select>
                </div>   
                <button className="create-account-button" type="submit" >Create Account</button>
            </div>
            </div>
        </form>   
    )
};
export default TdeeInfoForm;