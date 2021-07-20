import { useState } from 'react'
import Odometer from 'react-odometerjs';

import "../style/jackpotclassic.scss"
import "../style/mainBtn.scss"


const ProcessBar = ({ numberOfBets }) => {



    return (
        <div class="process-bar">
            <div class="process-bar__body">
                <div class="process-bar__inner-body" style={{ width: `${100 - numberOfBets*1.25}%` }}>
                </div>

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
    return (
        <main className="jackpot">
            <div className="infoPlay">
                <div className="infoPlay-Info">
                    <span><span className="orange">ИГРА</span> <span className="blue">#</span> 0</span>
                    <span><span className="orange">БАНК</span> <span className="blue">:</span> 0 руб</span>
                </div>
                <div className="infoPlay-rull">

                    <ProcessBar numberOfBets={30} />

                    <span>или через</span>
                    <span className="time">
                        <Odometer value={0} format="( ddd)" theme='minimal' />:<Odometer value={55} format="( ddd)" theme='minimal' />
                    </span>

                </div>
                <div className="classBetsSet">
                    <img src="	https://csgonoj.com/assets/images/comr.png"></img>
                    <span>Вы внесли 0 предметов<br />Ваш шанс на победу 0%</span>
                    <img src="	https://csgonoj.com/assets/images/comr.png"></img>
                    <span>Победитель определиться когда наберется <br />100 ПРЕДМЕТОВ или пройдет 60 СЕКУНД</span>
                    <img src="	https://csgonoj.com/assets/images/comr.png"></img>
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