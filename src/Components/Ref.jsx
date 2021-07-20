import { useState } from 'react'

import "../style/ref.scss"


function Ref() {

    return <div className="ref">
        <div className="ref__item">
            <input className="main-input" placeholder="Введите промокд либо реф. код" />
            <button className="ref__btn main-btn">Активировать</button>
        </div>
        <div className="ref__item ref-item">
            <label className="ref-item__title">Реф. ссылка</label>
            <div className="ref-item__body">
                <input className="main-input"/>
                <button className="ref__btn main-btn-2">Скопировать</button>
            </div>
        </div>
        <div className="ref__item ref-item">
            <label className="ref-item__title">Реф. код</label>
            <div className="ref-item__body">
                <input className="main-input"/>
                <button className="ref__btn main-btn-2">Скопировать</button>
            </div>
        </div>
    </div>
}

export default Ref