import { useState } from 'react'

import "../style/ref.scss"

function Ref() {

    return <div className="ref">
        <div>
            <input placeholder="Введите промокд либо реф. код" />
            <button>Активировать</button>
        </div>
        <div>
            <label>Реф. ссылка</label>
            <div>
                <input />
                <button>Скопировать</button>
            </div>
        </div>
        <div>
            <label>Реф. код</label>
            <div>
                <input />
                <button>Скопировать</button>
            </div>
        </div>
    </div>
}

export default Ref