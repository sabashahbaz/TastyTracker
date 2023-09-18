import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

function FoodItem ({item, addToFoodList}) {
    const navigate = useNavigate()

    function handleClick(e) {
        addToFoodList(item)
        // navigate("/food_log")

    }

    return (
        <div className="food-item" onClick={(e) => handleClick(e)} >
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <p>Calories: {item.calories} grams</p>
        </div> 
    )
}

export default FoodItem;


// .then(data => {
//     fetch(`/update_total_daily_calories_eaten/${currentUser.user_id}`, {
//       method: 'PATCH',
//       headers: {
//         "Content-Type": "application/JSON",
//       },
//       body: JSON.stringify({
//         "total_daily_calories_eaten": data.calories
//       })
//     })
//     console.log("did we pass the patch??")
//     .then(response => {
//       if (response.ok) {
//         console.log('Calories consumed updated successfully.');
//       } else {
//         console.error('Failed to update calories consumed.');
//       }
//     })
//     .catch(error => {
//       console.error('An error occurred while updating calories consumed:', error);
//     });

//     // Step 3: Update the state with the new food item
//     setFoodItem([...foodItem, data]);
//     console.log("did we finish")
//   })
//   .catch(error => {
//     console.log("Front-end is broken", error);
//   });
// }