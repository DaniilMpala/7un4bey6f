import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import "../style/rooms.scss"

import React from 'react'


const Room = ({ room, setActive, active }) => {
    var { name, stavkaValue, url } = room
    console.log(active, url)
    return (
        <Link to={url} onClick={() => { setActive(url) }} className={url.toLowerCase() == active ? `room ${name} active` : `room ${name}`}>
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



function Rooms({ setActive, active }) {
    const [tf2, settf2] = useState(~active.indexOf('rust') ? '' : 'active-mode')
    const [rust, setrust] = useState(!~active.indexOf('rust') ? '' : 'active-mode')
    const [roomData, setRoom] = useState([
        {
            name: "Classic",
            stavkaValue: 3743,
            url: ~active.indexOf("rust") ? "/rust/" : "/"
        },
        {
            name: "High",
            stavkaValue: 123,
            url: ~active.indexOf("rust") ? "/rust/jackpothigh" : "/jackpothigh"
        },
        {
            name: "Coinflip",
            stavkaValue: 123,
            url: ~active.indexOf("rust") ? "/rust/coinflip" : "/coinflip"
        },
        {
            name: "FastGame",
            stavkaValue: 123,
            url: ~active.indexOf("rust") ? "/rust/fastgame" : "/fastgame"
        },
    ])


    let roomsElements = roomData.map((room) => <Room setActive={setActive} room={room} active={active} />)

    useEffect(() => { }, [])

    return <div class="rooms">
        <div class="rooms__grid">

            <button onClick={() => { setRoom(roomData.map((v) => { v.url = v.url.replace("/rust", ""); settf2('active-mode'); setrust(''); return v })) }} class={`rooms__game-icon ttf ${tf2}`}>
                <img src={process.env.PUBLIC_URL + "/img/ttf.svg"} />
            </button>

            <button onClick={() => { setRoom(roomData.map((v) => { v.url = "/rust" + v.url.replace("/rust", ""); setrust('active-mode'); settf2(''); return v })) }} class={`rooms__game-icon rust ${rust}`}>
                <img src={process.env.PUBLIC_URL + "/img/rust_icon.svg"} />
            </button>

            <div className="rooms__row">
                {roomsElements}
            </div>

        </div>
    </div>
}

export default Rooms