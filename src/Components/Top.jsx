import { useState } from 'react'

import "../style/top.scss"

function Top() {

    return <div className="top">
        <div className="table">
            <div className="head">
                <span>Место</span>
                <span>Никнейм</span>
                <span>Кол-во побед</span>
                <span>Выиграл</span>
            </div>
            <div className="games-history">
                <div className="panel" >
                    <span>1</span>
                    <span className="infoTop">
                        <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/92/926b09159167b77edde1f1203c52f8ec61aabdc4_full.jpg"></img>
                        ник
                        </span>
                    <span>1</span>
                    <span className="danger">1</span>
                </div>
            </div>
        </div>
    </div>
}

export default Top