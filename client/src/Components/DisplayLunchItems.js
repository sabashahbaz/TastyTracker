import React from 'react';
import "../CSS/DisplayLunchItems.css";

function DisplayLunchItems({item}) {

    return (
        <div className="lunch-item">
            <h2>{item.name}</h2>
            <h3>{item.calories}</h3>
        </div>

    )
}

export default DisplayLunchItems;