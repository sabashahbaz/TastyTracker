import React from "react";

function UserDetails({currentUser, logout}) {

    console.log(currentUser.username)

    return (
    <div>
        <h1 className= "welcome-message">
            Welcome {currentUser.username}!</h1>
        <button onClick={logout}>Logout</button>
    </div>
    )
}
export default UserDetails