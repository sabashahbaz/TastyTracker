import React from 'react';
import "../../CSS/DisplayItems.css";

//display the individual food item on the food log
function DisplayFoodItems({item}) {

    //delete the added food item from food log 
    function deleteItem() {
        fetch(`/delete_food_item/${item.id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.status === 200) {
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
        <div className="list-group-item list-group-item-action list-group-item-success justify-content-center w-100 rounded-4">
            <b class="fs-5">{item.name}</b>
            <br></br>
            <small className= "calories">{item.calories} calories</small>
            <small className="delete-button" onClick={() =>deleteItem(item.id)}>🗑️</small>
        </div>
    )
};

export default DisplayFoodItems;