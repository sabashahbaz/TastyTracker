import React from 'react';
import "../CSS/DisplaySnackItems.css";

function DisplaySnackItems({item}) {

    return (
        <div className="snack-item">
            <h2>{item.name}</h2>
            <h3>{item.calories}</h3>
        </div>

    )
}

export default DisplaySnackItems;