import React from 'react';
import "../CSS/DisplayBreakfastItems.css";

function DisplayBreakfastItems({item}) {

    return (
        <div className="breakfast-item">
            <h2>{item.name}</h2>
            <h3>{item.calories}</h3>
        </div>

    )
}

export default DisplayBreakfastItems;