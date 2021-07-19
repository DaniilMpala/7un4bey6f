import { useState } from 'react'

import "../style/setting.scss"

function Setting() {

    return <div className="setting">
            <div>
                <input placeholder="Введите ссылку на обмен" />
                <button>Изменить</button>
            </div>
    </div>
}

export default Setting