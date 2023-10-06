import React from "react";
import image from "../../assets/meal-planning.png";
import photo from "../../assets/food.png"
import CSS from "../../CSS/aboutus.css"

//About Us page
function AboutUs ({currentUser}) {

    return (
    <div className="about-us-page">
        <div className="about-us-body">
            <img src={image} className="meal-image" />
            <div className="about-card-body-text">
                <h5 className="card-title">Our Mission</h5>
                <p className="card-text">
                "Our mission at Tasty Tracker is to empower individuals to achieve their health and fitness goals through personalized nutrition tracking and access to a rich repository of recipes. We strongly believe in achieving a healthy lifestyle, while enjoying the foods you love!"
                </p>
                <p className="card-text">
                <small className="text-muted">- Saba Shahbaz, Founder of Tasty Tracker</small>
                </p>
            </div>
            <img src={photo} className="eating-image"  />
        </div>
        <div className="about-us-page ">
        <div className="card border-light mb-4 text-center d-flex justify-content-center align-items-center border-white" style={{ width: "20px;" }}>
            <div className="col-md-8" style={{ width: "100%;" }}>
            <br></br>
            <div className="card-body justify-center" style={{ width: "800px;" }}>
                <h5 className="card-title fs-3">For Food Lovers, By Food Lovers</h5>
                <p className="card-text">
                We are your go-to platform for achieving a healthy lifestyle while relishing the foods you love. Whether you're looking to shed a few pounds, maintain a balanced life, or simply explore new culinary adventures, Tasty Tracker has you covered. With our intuitive calorie tracking tools and a vast collection of delicious recipes, you'll have everything you need to make informed choices about your nutrition, all while enjoying the flavors you adore. Join our community today, take control of your health journey, and savor the taste of success. Sign up now and embark on a flavorful path to a healthier you!
                </p>
                <p className="card-text">
                {currentUser 
                ? (
                    <a href="/food_log" class="btn btn-success">Log Your Meals Today!</a>
                ) 
                : (
                    <a href="/create_account" class="btn btn-success">Join Us Today!</a>
                )}
                </p>
            </div>
            </div>
        </div>
        </div>
    </div>
);
}

export default AboutUs;