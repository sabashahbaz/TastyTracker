import React from 'react'
import CSS from "../CSS/tdeeform.css"

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
        <form className="tdee-calculator-container w-100" onSubmit={handleSubmitAccountForm}>
            <div className="tdee-container">
                <div className="text-center p-4">
                    <h3>Calculate Total Daily Energy Expenditure (TDEE)</h3>
                    <p className="p">to help achieve your goal weight</p>
                </div>
                <div className="form-content">
                <div className="d-flex ">
                    <div className="form-check form-check-inline ">
                        <label>Gender :</label>
                    </div>
                    <div className="">
                        <div className="form-check form-check-inline mb-4">
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
                    <div className="d-flex w-100 ms-3 p-2 ">
                        <label className="form-check-label form-check-inline">Age: </label>
                            <div className="form-check form-check-inline mb-4">
                            <input
                            type="text"
                            size="56"
                            className="form-control w-100 "
                            id="inputage"
                            aria-describedby="username"
                            onChange={(e) => setAge(e.target.value)}
                            value={age}
                            />
                        </div>
                    </div>
                    <div className = "d-flex w-100 ms-2 p-2 mb-3 ">
                    <label className="form-check-label form-check-inline">Height: </label>
                        <select
                        class="form-select form-check-inline form-select-sm mb-4 "  aria-label="Default select example"
                        name="height"
                        className="form-control w-50 "
                        value={selectedHeight}
                        onChange={(e) => setSelectedHeight(e.target.value)}
                        >
                        <option value="">Select Height</option>
                        {heightOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className= "d-flex w-100 ms-2 p-2 ">
                    <label className="form-check-label form-check-inline ">Weight: </label>
                        <input
                        type="text"
                        size="35"
                        className="form-control w-50 "
                        id="inputage"
                        aria-describedby="weight"
                        name="weight"
                        onChange={(e) => setWeight(e.target.value)}
                        value={weight}
                        />
                    </div>
                    <div className = "d-flex w-100 ms-2 p-2 ">
                    <label className="form-check-label form-check-inline">Activity: </label>
                        <select
                        class="form-select form-check-inline form-select-sm mb-4 "  aria-label="Default select example"
                        name="acitivity level"
                        className="form-control w-50 "
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
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary btn-success fs-7 w-75 mt-4 mx-100">Create Account</button>
                    </div>
                </div>
            </div>
        </form>   
    )
}
export default TdeeInfoForm;