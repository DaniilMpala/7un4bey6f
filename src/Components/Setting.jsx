import { useState } from 'react'

import "../style/setting.scss"

function Setting() {

    return <div className="setting">
            <div className="main-input">
                <input className="main-input" placeholder="Введите ссылку на обмен" />
                <button className="main-btn">Изменить</button>
            </div>
    </div>
}

export default Setting