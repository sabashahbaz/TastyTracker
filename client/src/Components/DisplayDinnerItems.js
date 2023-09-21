import React from 'react';
import "../CSS/DisplayDinnerItems.css";

function DisplayDinnerItems({item}) {

    return (
        <div className="dinner-item list-group-item list-group-item-action list-group-item-primary justify-content-center w-100">
        <b class="fs-5">{item.name}</b>
        <br></br>
        <small>{item.calories} calories</small>
        {/* <button><i class="bi bi-trash"></i></button> */}
    </div>
    )
}

export default DisplayDinnerItems;