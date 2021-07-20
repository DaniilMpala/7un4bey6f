import { useState } from 'react'

import "../style/rooms.scss"

import React from 'react'

const roomData = [
    {
        name: "qwerty",
        stavkaValue: 123
    },
    {
        name: "qwerty",
        stavkaValue: 123
    },
    {
        name: "qwerty",
        stavkaValue: 123
    },
    {
        name: "qwerty",
        stavkaValue: 123
    },
]

const Room = ({name,stavkaValue}) => {
    return (
        <div class="room">
            <div className="room__grid">
                <div className="room__icon"><img src={`img/${name}.png`} /></div>
                <div className="room__title">{name}</div>
                <div className="room__stavka">
                    на кону: <span>{stavkaValue}</span>
                </div>
            </div>            
        </div>
    )
}



function Rooms() {


    let roomsElements = roomData.map( ({name, stavkaValue}) => <Room name={name} stavkaValue={stavkaValue}/>)

    return <div class="rooms">
        <div className="rooms__grid">
            
            {roomsElements}
        </div>
        
    </div>
}

export default Rooms