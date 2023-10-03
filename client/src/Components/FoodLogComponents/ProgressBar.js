import React, {useState} from 'react'
import CSS from "../../CSS/ProgressBar.css"

function ProgressBar ({caloriesIAte, currentTdee}) {

// Calculate the percentage of caloriesIAte relative to currentTdee
const percentage = (caloriesIAte / currentTdee) * 100;

// Determine the color based on whether caloriesIAte exceeds currentTdee
const getColor = () => {
  if (caloriesIAte < currentTdee) {
    return "#50C878"; // Green if caloriesIAte is less than currentTdee
  } else {
    return "#FF0000"; // Red if caloriesIAte is greater than or equal to currentTdee
  }
};

return (
<div className="container">
    <div className="bar">
    <div
        className="fill"
        style={{
        width: `${percentage}%`,
        backgroundColor: getColor(),
        }}
    ></div>
    </div>
</div>
);
}

export default ProgressBar;








