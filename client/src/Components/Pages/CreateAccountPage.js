import React, { useState } from "react";
import {useNavigate, Link} from 'react-router-dom';
import UserInfoForm from '../UserInfoForm'
import TdeeInfoForm from "../TdeeInfoForm";
import CSS from "../../CSS/createaccountpage.css"

//create account page
function CreateAccountPage({setCurrentUser, setCurrentTdee}) {

const navigate = useNavigate();

//state variable for create account form 
const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")

const [selectedGender, setSelectedGender] = useState("");
const [age, setAge] = useState("")
const [selectedHeight, setSelectedHeight] = useState(""); 
const [weight, setWeight] = useState("")
const [selectedActivity, setSelectedActivity] = useState(1)

const [step, setStep] = useState(1)


    //allow user to proceed to the next part of the form after filling out user info
    function handleSubmitUserInfo(e) {
        e.preventDefault();
        if (firstName && lastName && username && password)  {
            setStep(2);
        } else {
            alert("Please complete all required fields") //make sure all required fields are completed 
        }  
    };

    //create account + calculate TDEE function
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
            accountResponse = data;
            setCurrentUser(data.user.username)
            setCurrentTdee(data.user.tdee)
        });
        if (accountResponse) navigate('/food_log') //once a response is received, navigate to the food log 
        };

return (
    <div className="create-account-page"> 
        <div className="container d-flex w-75" style={{ height: '700px', width: '100%' }}>
            {step === 1 /* while step =1, user must fill out account information */
            ? (
            <UserInfoForm 
                setStep={setStep} 
                handleSubmitUserInfo={handleSubmitUserInfo}
                firstName={firstName} setFirstName={setFirstName}
                lastName={lastName} setLastName={setLastName}
                username={username} setUsername={setUsername}
                password={password} setPassword={setPassword}
                />)
            : (   /* while step is not 1, user must fill out information to determine TDEE */
            <TdeeInfoForm 
                handleSubmitAccountForm={handleSubmitAccountForm}
                selectedGender={selectedGender} setSelectedGender={setSelectedGender}
                age={age} setAge={setAge}
                selectedHeight={selectedHeight} setSelectedHeight={setSelectedHeight}
                weight={weight} setWeight={setWeight}
                selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity}
            />)    
        } 
        </div>
    </div>
    );
} 
export default CreateAccountPage;

