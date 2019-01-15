import React from "react"
import './Profile.css'

function Profile({name, img, school, major}){
    return(
        <div class="profile">
            <div class="profileImg">
                <img src={img} alt=""></img>
            </div>
            <div class="name"><h2>{name}</h2></div>
            <div class="school">{school}</div>
            <div class="major">{major}</div>
        </div>
    )
}

export default Profile;