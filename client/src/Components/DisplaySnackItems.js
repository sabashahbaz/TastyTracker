import React from 'react';
import "../CSS/DisplaySnackItems.css";

function DisplaySnackItems({item}) {

    function deleteItem() {
        fetch(`/delete_food_item/${item.id}`, {
            method: 'DELETE',
        })
        // .then((data) => console.log(data))
        .then(response => {
            if (response.status === 200) {
                console.log("Food item deleted successfully");
                window.location.reload();
            } else if (response.status === 404) {
                console.log("Food item not found");
            } else {
                console.error("Error:", response.statusText);
            }
        })
        .catch(error => console.error("Error:", error));
    }
    return (
        <div className="breakfast-item list-group-item list-group-item-action list-group-item-primary justify-content-center w-100">
            <b class="fs-5">{item.name}</b>
            <br></br>
            <small>{item.calories} calories</small>
            <small onClick={() =>deleteItem(item.id)}>🗑️</small>
        </div>

    )
}

export default DisplaySnackItems;