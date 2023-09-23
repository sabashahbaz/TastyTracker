import React from 'react';
import "../CSS/DisplayLunchItems.css";

function DisplayLunchItems({item, deleteItem}) {

    return (
        <div className="lunch-item list-group-item list-group-item-action list-group-item-primary justify-content-center w-100">
            <b class="fs-5">{item.name}</b>
            <br></br>
            <small>{item.calories} calories</small>
        </div>

    )
}

export default DisplayLunchItems;