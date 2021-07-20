import { useState, useEffect } from 'react'
import Odometer from 'react-odometerjs';
import Rulletka from './rulletka';

import "../style/jackpotclassic.scss"



const ProcessBar = ({ numberOfBets }) => {
    useEffect(() => {

    }, []);
    return (
        <div class="process-bar">
            <div class="process-bar__body">
                <div class="process-bar__inner-body"
                    style={{ right: `-${numberOfBets * 1.25}%` }} />

                <div class="process-bar__info">
                    <div class="process-bar__number-of-bets">
                        <span>{numberOfBets}</span> / 80
                    </div>
                    <div class="process-bar__subtext">предметов</div>
                </div>
            </div>
        </div>
    )
}

function JackpotClassic() {
    const [time, setTime] = useState(15)
    const [dataUsers, setDataUsers] = useState([{
        Id: "316283884",
        chance: 99,
        name: "Даниил Морозов",
        src: "https://sun1-91.userapi.com/s/v1/ig1/iOkuSHYu5gOdsMa45_Qjun5fLsKNI0FsFhaBAX4N5rhU_OgfgbgoDXmDx5gAJ24C8xVUPHlW.jpg?size=50x0&quality=96&crop=0,0,1024,1024&ava=1",
    },
    {
        Id: "31",
        chance: 1,
        name: "Даниил Морозов",
        src: "https://sun1-22.userapi.com/s/v1/if1/DqQ-7PU9OphwpL7XrQL1mtXat1Grvsy4jWj1PMwLZouiE7hOGjJAvXIzwBmWjdlFdkDN97hr.jpg?size=50x0&quality=96&crop=361,253,200,200&ava=1",
    }])
    const [victory, setVictory] = useState({ Id: "31" })
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       setTime(time=>time-1)
    //     }, 1000);
    //     return () => clearInterval(interval);
    //   }, []);

    return (
        <main className="jackpot">
            <div className="infoPlay">
                <div className="infoPlay-Info">
                    <span><span className="orange">ИГРА</span> <span className="blue">#</span> 0</span>
                    <span><span className="orange">БАНК</span> <span className="blue">:</span> 0 руб</span>
                </div>
                {dataUsers.length > 0
                    ? <Rulletka dataUsers={dataUsers} victory={victory} />
                    : <div className="infoPlay-rull">
                        <ProcessBar numberOfBets={20} />
                        <span>или через</span>
                        <span className="time">
                            {console.log(time % 60)}
                            0<Odometer value={Math.floor(time / 60)} format="( ddd)" theme='minimal' />:{time % 60 < 9 ? 0 : ""}<Odometer value={time % 60} format="( ddd)" theme='minimal' />
                        </span>
                    </div>}
                <div className="classBetsSet">
                    <img src="img/2arr.png"></img>
                    <span>Вы внесли 0 предметов<br />Ваш шанс на победу 0%</span>
                    <img src="img/2arr.png"></img>
                    <span>Победитель определиться когда наберется <br />100 ПРЕДМЕТОВ или пройдет 60 СЕКУНД</span>
                    <img src="img/2arr.png"></img>
                    <a className="main-btn" href="">Поставить ставку</a>
                </div>
            </div>
            <div className="listUserBets">
                <div>
                    <img src="https://sun1-91.userapi.com/s/v1/ig1/iOkuSHYu5gOdsMa45_Qjun5fLsKNI0FsFhaBAX4N5rhU_OgfgbgoDXmDx5gAJ24C8xVUPHlW.jpg?size=50x0&quality=96&crop=0,0,1024,1024&ava=1"></img>
                    <span>10%</span>
                </div>
            </div>
            <div>
                <div className="betsUser">
                    <div className="betsUser_info">
                        <div className="betsUser_moreInfo" >
                            <img src="https://sun1-91.userapi.com/s/v1/ig1/iOkuSHYu5gOdsMa45_Qjun5fLsKNI0FsFhaBAX4N5rhU_OgfgbgoDXmDx5gAJ24C8xVUPHlW.jpg?size=50x0&quality=96&crop=0,0,1024,1024&ava=1"></img>
                            <div>
                                <span className="orange">Ник</span>
                                <span className="blue">внес</span>
                                <span className="orange">0</span>
                                <span className="blue">предметов</span>
                                <span className="orange">10.00руб</span>
                            </div>
                        </div>
                        <div className="tikets">
                            Билеты от: &nbsp;
                            <span className="orange"> 0</span>&nbsp;
                            до &nbsp;
                            <span className="orange"> 100</span>
                        </div>
                    </div>
                    <div className="betsUser_bet">
                        <div>
                            <img title="fg" src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRfSV7cTur_h56KHE59IjtSpaqsOQZux_yGIGkXut_kw4LfzvGiZr-Dxz8CscN02O_Epo2i2QTir0trZm_3LY7EcBh-Pw-wldGgpA/100x100f"></img>
                            <span>9.83</span>
                        </div>
                        <div>
                            <img title="fg" src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRfSV7cTur_h56KHE59IjtSpaqsOQZux_yGIGkXut_kw4LfzvGiZr-Dxz8CscN02O_Epo2i2QTir0trZm_3LY7EcBh-Pw-wldGgpA/100x100f"></img>
                            <span>9.83</span>
                        </div>
                        <div>
                            <img title="fg" src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRfSV7cTur_h56KHE59IjtSpaqsOQZux_yGIGkXut_kw4LfzvGiZr-Dxz8CscN02O_Epo2i2QTir0trZm_3LY7EcBh-Pw-wldGgpA/100x100f"></img>
                            <span>9.83</span>
                        </div>
                        <div>
                            <img title="fg" src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRfSV7cTur_h56KHE59IjtSpaqsOQZux_yGIGkXut_kw4LfzvGiZr-Dxz8CscN02O_Epo2i2QTir0trZm_3LY7EcBh-Pw-wldGgpA/100x100f"></img>
                            <span>9.83</span>
                        </div>
                        <div>
                            <img title="fg" src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRfSV7cTur_h56KHE59IjtSpaqsOQZux_yGIGkXut_kw4LfzvGiZr-Dxz8CscN02O_Epo2i2QTir0trZm_3LY7EcBh-Pw-wldGgpA/100x100f"></img>
                            <span>9.83</span>
                        </div>
                        <div>
                            <img title="fg" src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRfSV7cTur_h56KHE59IjtSpaqsOQZux_yGIGkXut_kw4LfzvGiZr-Dxz8CscN02O_Epo2i2QTir0trZm_3LY7EcBh-Pw-wldGgpA/100x100f"></img>
                            <span>9.83</span>
                        </div>
                        <div>
                            <img title="fg" src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRfSV7cTur_h56KHE59IjtSpaqsOQZux_yGIGkXut_kw4LfzvGiZr-Dxz8CscN02O_Epo2i2QTir0trZm_3LY7EcBh-Pw-wldGgpA/100x100f"></img>
                            <span>9.83</span>
                        </div>
                    </div>
                </div>
                <div className="betsUser">
                    <div className="betsUser_info">
                        <div className="betsUser_moreInfo" >
                            <img src="https://sun1-91.userapi.com/s/v1/ig1/iOkuSHYu5gOdsMa45_Qjun5fLsKNI0FsFhaBAX4N5rhU_OgfgbgoDXmDx5gAJ24C8xVUPHlW.jpg?size=50x0&quality=96&crop=0,0,1024,1024&ava=1"></img>
                            <div>
                                <span className="orange">Ник</span>
                                <span className="blue">внес</span>
                                <span className="orange">0</span>
                                <span className="blue">предметов</span>
                                <span className="orange">10.00руб</span>
                            </div>
                        </div>
                        <div className="tikets">
                            Билеты от: &nbsp;
                            <span className="orange"> 0</span>&nbsp;
                            до &nbsp;
                            <span className="orange"> 100</span>
                        </div>
                    </div>
                    <div className="betsUser_bet">
                        <div>
                            <img title="fg" src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRfSV7cTur_h56KHE59IjtSpaqsOQZux_yGIGkXut_kw4LfzvGiZr-Dxz8CscN02O_Epo2i2QTir0trZm_3LY7EcBh-Pw-wldGgpA/100x100f"></img>
                            <span>9.83</span>
                        </div>
                        <div>
                            <img title="fg" src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRfSV7cTur_h56KHE59IjtSpaqsOQZux_yGIGkXut_kw4LfzvGiZr-Dxz8CscN02O_Epo2i2QTir0trZm_3LY7EcBh-Pw-wldGgpA/100x100f"></img>
                            <span>9.83</span>
                        </div>
                        <div>
                            <img title="fg" src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRfSV7cTur_h56KHE59IjtSpaqsOQZux_yGIGkXut_kw4LfzvGiZr-Dxz8CscN02O_Epo2i2QTir0trZm_3LY7EcBh-Pw-wldGgpA/100x100f"></img>
                            <span>9.83</span>
                        </div>
                        <div>
                            <img title="fg" src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRfSV7cTur_h56KHE59IjtSpaqsOQZux_yGIGkXut_kw4LfzvGiZr-Dxz8CscN02O_Epo2i2QTir0trZm_3LY7EcBh-Pw-wldGgpA/100x100f"></img>
                            <span>9.83</span>
                        </div>
                        <div>
                            <img title="fg" src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRfSV7cTur_h56KHE59IjtSpaqsOQZux_yGIGkXut_kw4LfzvGiZr-Dxz8CscN02O_Epo2i2QTir0trZm_3LY7EcBh-Pw-wldGgpA/100x100f"></img>
                            <span>9.83</span>
                        </div>
                        <div>
                            <img title="fg" src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRfSV7cTur_h56KHE59IjtSpaqsOQZux_yGIGkXut_kw4LfzvGiZr-Dxz8CscN02O_Epo2i2QTir0trZm_3LY7EcBh-Pw-wldGgpA/100x100f"></img>
                            <span>9.83</span>
                        </div>
                        <div>
                            <img title="fg" src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRfSV7cTur_h56KHE59IjtSpaqsOQZux_yGIGkXut_kw4LfzvGiZr-Dxz8CscN02O_Epo2i2QTir0trZm_3LY7EcBh-Pw-wldGgpA/100x100f"></img>
                            <span>9.83</span>
                        </div>
                    </div>
                </div>
                <div className="startGame">
                    <span>ИГРА НАЧАЛАСЬ! ВНОСИТЕ ДЕПОЗИТЫ!</span>
                </div>
            </div>
        </main>
    )
}

function rulletka() {


}

export default JackpotClassic