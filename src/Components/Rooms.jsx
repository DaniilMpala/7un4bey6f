import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import "../style/rooms.scss"

import React from 'react'


const Room = ({room, setActive, active}) => {
    var { name, stavkaValue, url } = room
    console.log(name.toLowerCase(), active)
    return (
        <Link to={url} onClick={()=>{setActive(url)}} className={~active.indexOf(name.toLowerCase()) ? "room active" : "room"}>
            <div class="room__grid">
                <div class="room__icon">
                    <img src={`${process.env.PUBLIC_URL}/img/${name}.svg`} />

                </div>
                <div class="room__title">{name}</div>
                <div class="room__stavka">
                    на кону: <span>{stavkaValue}</span>
                </div>
            </div>
        </Link>
    )
}



function Rooms({setActive, active}) {

    const [roomData, setRoom] = useState([
        {
            name: "Classic",
            stavkaValue: 3743,
            url: "/"
        },
        {
            name: "High",
            stavkaValue: 123,
            url: "/jackpothigh"
        },
        {
            name: "Coinflip",
            stavkaValue: 123,
            url: "/"
        },
        {
            name: "undefined",
            stavkaValue: 123,
            url: "/"
        },
    ])

    console.log(roomData)
    let roomsElements = roomData.map((room) => <Room setActive={setActive} room={room} active={active} />)

    useEffect(() => { }, [])
    return <div class="rooms">
        <div class="rooms__grid">
            <button onClick={() => { setRoom(roomData.map((v) => { v.url = v.url.replace("/rust", ""); return v })) }} class="rooms__game-icon ttf">
                <img src={process.env.PUBLIC_URL + "/img/ttf.svg"} />
            </button>
            <button onClick={() => { setRoom(roomData.map((v) => { v.url = "/rust" + v.url.replace("/rust", ""); return v })) }} class="rooms__game-icon rust">
                <img src={process.env.PUBLIC_URL + "/img/rust_icon.svg"} />
            </button>


            <div className="rooms__row">
                {roomsElements}
            </div>


        </div>

    </div>
}

export default Rooms