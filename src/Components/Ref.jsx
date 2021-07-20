import { useState } from 'react'

import "../style/ref.scss"


function Ref() {

    return <div className="ref">
        <div>
            <p>Приглашайте новых пользователей на сайт и получайте бонус с их победных игр, а точнее - 10% с их комиссии.</p>
        </div>
        <div className="balanceref">
            <span className="balanceref__balance">0.00</span><span>Вы заработали</span>
        </div>
        <div className="ref__item ref-item main-item">
            <input className="main-input" placeholder="Введите промокд либо реф. код" />
            <button className="ref__btn main-btn">Активировать</button>
        </div>
        <div className="ref__item ref-item">
            <label className="ref-item__title">Реф. ссылка</label>
            <div className="ref-item__body">
                <input className="main-input"/>
                <button className="ref__btn main-btn">Скопировать</button>
            </div>
        </div>
        <div className="ref__item ref-item">
            <label className="ref-item__title">Реф. код</label>
            <div className="ref-item__body">
                <input className="main-input"/>
                <button className="ref__btn main-btn">Скопировать</button>
            </div>
        </div>
    </div>
}

export default Ref