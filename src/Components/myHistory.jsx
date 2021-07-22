import { useState } from 'react'

import "../style/myhistory.scss"

function myHistory() {

    return <div className="myhistory">
        <span className="title">МОИ ИГРЫ</span>

        <div className="game">
            <div className="leftBlock">
                <div className="info_1">
                    <span className="playNumber">Игра: <span className="winTick">#0</span></span>
                    <span>Победил с шансом: 49%</span>
                </div>
                <div className="info_2">
                    <span className="nick">Победил:
                        <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/92/926b09159167b77edde1f1203c52f8ec61aabdc4_full.jpg"></img>
                        <span>ник</span>
                    </span>
                    <span>Банк: <span className="winTick">4000</span></span>
                </div>
            </div>

            <div className="info_game">
                <span>{new Date().toLocaleString()}</span>
                <div class="status_items_comr_c">Вещи отправлены</div>
            </div>
        </div>
        <div className="game">
            <div className="leftBlock">
                <div className="info_1">
                    <span className="playNumber">Игра: <span className="winTick">#0</span></span>
                    <span>Победил с шансом: 49%</span>
                </div>
                <div className="info_2">
                    <span className="nick">Победил:
                        <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/92/926b09159167b77edde1f1203c52f8ec61aabdc4_full.jpg"></img>
                        <span>ник</span>
                    </span>
                    <span>Банк: <span className="winTick">4000</span></span>
                </div>
            </div>

            <div className="info_game">
                <span>{new Date().toLocaleString()}</span>
                <div class="status_items_comr_c">Вещи отправлены</div>
            </div>
        </div>
    </div>
}

export default myHistory