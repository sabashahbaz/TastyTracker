import React, {useState} from 'react';

function FoodLogForm () {

    return (
        <form>
            <select
                name="meals"
            >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snacks</option>
            </select>
            

        </form>
    )
}

export default FoodLogForm;