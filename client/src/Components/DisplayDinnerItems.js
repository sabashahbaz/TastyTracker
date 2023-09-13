import React from 'react';
import "../CSS/DisplayDinnerItems.css";

function DisplayDinnerItems({item}) {

    return (
        <div className="dinner-item">
            <h2>{item.name}</h2>
            <h3>{item.calories}</h3>
        </div>

    )
}

export default DisplayDinnerItems;