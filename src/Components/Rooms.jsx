import { useState} from 'react'
import {Link} from "react-router-dom"
import "../style/rooms.scss"

import React from 'react'

const roomData = [
    {
        name: "Classic",
        stavkaValue: 3743
    },
    {
        name: "High",
        stavkaValue: 123
    },
    {
        name: "Coinflip",
        stavkaValue: 123
    },
    {
        name: "undefined",
        stavkaValue: 123
    },
]

const Room = ({name,stavkaValue}) => {
    return (
        <Link to="/" class="room">
            <div class="room__grid">
                <div class="room__icon">
                    <img src={`img/${name}.svg`} />
                    
                </div>
                <div class="room__title">{name}</div>
                <div class="room__stavka">
                    на кону: <span>{stavkaValue}</span>
                </div>
            </div>            
        </Link>
    )
}



function Rooms() {


    let roomsElements = roomData.map( ({name, stavkaValue}) => <Room name={name} stavkaValue={stavkaValue}/>)

    return <div class="rooms">
        <div class="rooms__grid">
            <button class="rooms__game-icon ttf">
                <img  src="img/ttf.svg"/>
            </button>
            <button class="rooms__game-icon rust">
                <img  src="img/rust_icon.svg"/>
            </button>
            
            
            
            <div className="rooms__row">
                {roomsElements}
            </div>
            
                
        </div>
        
    </div>
}

export default Rooms