import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

function FoodItem ({item, selectedMeal, setFoodItem, currentUser, foodItem, setTotalCaloriesIAte}) {
    const navigate = useNavigate()

    // const [foodItem, setFoodItem] = useState([])

    // console.log("hey from food item page", foodItem)

    function postDataAndPatchData() {
        // const newObj = {
        //     "name": item.name, 
        //     "description": item.description,
        //     "calories": item.calories,
        //     "meal_type": selectedMeal,
        //     "user_id": currentUser.user_id,
        // }
        // console.log(newObj)
        fetch('/add_to_food_list', {
            method: 'POST',
            headers: {
                "Content-Type": "application/JSON",
            },
            body: JSON.stringify({
                "name": item.name, 
                "description": item.description,
                "calories": item.calories,
                "meal_type": selectedMeal,
                "user_id": currentUser.user_id,
            })
        })
            .then(response => response.json())
            .then(data =>setFoodItem([...foodItem, data]))

        fetch(`/update_calories_eaten/${currentUser.user_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "calories": item.calories,
            })
        })
            .then(response => response.json())
            .then(data => setTotalCaloriesIAte(data.caloriesgit) )
};

// console.log(foodItem)

    return (
        <div className="food-item" onClick={(e) => postDataAndPatchData(e)} >
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <p>Calories: {item.calories} calories</p>
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




    // console.log(currentFoodResponse)

    // async function handleClick(e) {
    //     await addToFoodList(item)
    //     if (currentFoodResponse) {
    //         navigate('/food_log')
    //         console.log(currentFoodResponse)
    //     }
    //     console.log("hey")
    //     // console.log(currentUser.user_id)
    //     fetch(/update_calories_eaten/, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accepts': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             "calories": item.calories,
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(data => setTotalCaloriesIAte(data))
    //     postDataAndPatchData(item)
    

    // async function postDataAndPatchData(foodToAdd, caloriesToPatch) {
    //     try {
    //         const postResponse = await fetch('/add_to_food_list', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 "name": foodToAdd.name, 
    //                 "description": foodToAdd.description,
    //                 "calories": foodToAdd.calories,
    //                 "meal_type": selectedMeal,
    //                 "user_id": currentUser.user_id,
    //             }),
    //         });
    
    //         const patchResponse = await fetch(`/update_calories_eaten`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 "calories": caloriesToPatch.calories,
    //             }),
    //         });
    
    //         if (postResponse.ok && patchResponse.ok) {
    //             const postData = await postResponse.json();
    //             const patchData = await patchResponse.json();
    
    //             console.log('POST Response:', postData);
    //             console.log('PATCH Response:', patchData);
    //         } else {
    //             console.error("Request failed");
    //         }
    //     } catch (error) {
    //         console.error("An error occurred:", error);
    //     }
    // }