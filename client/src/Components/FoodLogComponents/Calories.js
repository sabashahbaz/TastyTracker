import React, {useState} from 'react';
import searchpage from "../../CSS/ProgressBar.css"

//calores displayed on top of foodlog
function Calories ({currentTdee, caloriesIAte}) {
    
    
    return (
        <div>
            <div className="Tdee-display">
                <div className="tdee-bg">
                    <div className="tdee-text">
                        <h3>{currentTdee - caloriesIAte} calories left to eat</h3>
                    </div>
                </div>
                
            </div>
            <div className="calories-eaten-display">
                <div className="eaten-bg">
                    <div className="eaten-text">
                        <h3>{caloriesIAte} calories eaten </h3>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Calories; 