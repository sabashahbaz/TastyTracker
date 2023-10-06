import React, {useEffect} from 'react';
import SearchFoodBar from '../FoodLogComponents/FoodSearchBar';
import FoodItem from "../FoodLogComponents/FoodItem";
import CSS from "../../CSS/searchpage.css"

//food item search page -> to add to food log
function SearchResultsPage ({
    currentUser,
    setFoodItem, 
    foodItem, 
    selectedMeal, 
    setTotalCaloriesIAte, 
    setSearchedItems, 
    searchedItems, 
    currentFoodResponse, 
    setCurrentUser,
    setCurrentFoodLog,
    currentFoodLog
    }) {

    useEffect(() => {
        fetch('/check_session')
        .then(response => {
            if(response.ok) {
            response.json()
            .then(data => {
                setCurrentUser(data)
                setCurrentFoodLog(data.total_calories_eaten.id)
            })}
        })
    }, []);

    return (
        <div className="search-bg-image">
            <div className="search-page">
            <SearchFoodBar setSearchedItems={setSearchedItems}/>
            <div className="search-list-container-map"> {/* the list of searched food items for food log */}
                {searchedItems.map((item) => (
                <FoodItem
                    key={item.id}
                    item={item}
                    currentFoodLog={currentFoodLog}
                    setFoodItem={setFoodItem}
                    foodItem={foodItem}
                    selectedMeal={selectedMeal}
                    currentUser={currentUser}
                    currentFoodResponse={currentFoodResponse}
                    setTotalCaloriesIAte={setTotalCaloriesIAte}
                    setSearchedItems={setSearchedItems}
                />
                ))}
            </div>
            </div>
        </div>
        );   
    };

export default SearchResultsPage;