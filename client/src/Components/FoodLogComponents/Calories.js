import React, {useState} from 'react';
import searchpage from "../../CSS/searchpage.css"

function Calories ({currentTdee, caloriesIAte}) {
    console.log(currentTdee - caloriesIAte)
    //My TDEE: {currentTdee}
    return (
        <div>
            <div className="Tdee-display">
                <h3> I have {currentTdee - caloriesIAte} calories left to eat today</h3>
            </div>
            {/* <div className="progress-bar">
                <progress></progress>
            </div> */}
            <div className="calories-eaten-display">
            <h3> I ate: {caloriesIAte} calories </h3>
            </div>
        </div>
    )
}

export default Calories; 