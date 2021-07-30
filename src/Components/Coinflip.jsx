import { useState } from 'react'

import "../style/coinflip.scss"


function Coinflip({ type }) {
    const [LoadItemsId, setLoadItemsId] = useState(0)
    const [list, setList] = useState([
        {
            id: 1,
            bank: 22,
            status: {
                status: 1,
                win: 0
            },
            player: [
                {
                    src: "https://sun1-91.userapi.com/s/v1/ig1/iOkuSHYu5gOdsMa45_Qjun5fLsKNI0FsFhaBAX4N5rhU_OgfgbgoDXmDx5gAJ24C8xVUPHlW.jpg?size=50x0&quality=96&crop=0,0,1024,1024&ava=1",
                    name: "frfgt",
                    side: 0,
                    chance: "49.50%",
                    ticket: "100-10000"
                },
                {
                    src: "https://sun1-91.userapi.com/s/v1/ig1/iOkuSHYu5gOdsMa45_Qjun5fLsKNI0FsFhaBAX4N5rhU_OgfgbgoDXmDx5gAJ24C8xVUPHlW.jpg?size=50x0&quality=96&crop=0,0,1024,1024&ava=1",
                    name: "frfgt",
                    side: 1,
                    chance: "49.50%",
                    ticket: "100-10000"
                }
            ],
            items: [
                {
                    name: "grgtg",
                    src: "https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f",
                    price: "1.00",
                    player: 0
                },
                {
                    name: "grgtg",
                    src: "https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f",
                    price: "1.00",
                    player: 0
                },
                {
                    name: "grgtg",
                    src: "https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f",
                    price: "1.00",
                    player: 1
                },
            ]
        },
    ])
    return <div className="coinflip">
        <div className="classBetsSet">
            <img src={`${process.env.PUBLIC_URL}/img/2arr.png`}></img>
            <span>Добро пожаловать в Coinflip.В ней вы сразитесь 1 на 1 <br /> с другим игроком при приблизительно равных на победу шансах.</span>
            <img src={`${process.env.PUBLIC_URL}/img/2arr.png`}></img>
            <span><span className="minBet">Минимальная ставка 0.2$</span>,<br /> максимум предметов 15. </span>
            <img src={`${process.env.PUBLIC_URL}/img/2arr.png`}></img>
            <a className="main-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Поставить ставку</a>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Создание игры</h5>
                    </div>
                    <div class="modal-body">
                        <div class="choice">
                            <div>
                                <span>Минимальная ставка 0.2$,максимум предметов 15.<br />
                                    Выберите сторону, если это необходимо и после нажмите "Депозит" <br />
                                    Вы получите обмен, который Вам нужно будет принять</span>
                            </div>
                            <div class="choiceCommand">
                                <div class="sides">
                                    <div class="left-side"></div>
                                    <div class="right-side selected"></div>
                                </div>
                                <button type="button" class="main-btn">Поставить</button>
                            </div>
                        </div>
                        <div class="cf-inventory">
                            <div class="cf-inventory-header">
                                <b>Ваш инвентарь</b>
                                <div class="cf-inv-refresh pull-right">
                                    <i class="fa fa-refresh"></i>
                                    <span>Обновить инвентарь</span>
                                </div>
                            </div>
                            <div className="allitem">
                                <div className="item">
                                    <span title="gtgtgtgtg" className="title">gtgtgtgtg</span>
                                    <img src="https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f" alt="The Frying Pan" />
                                    <span>0.01</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div className="table">
            <div className="head">
                <span>Номер</span>
                <span>Игроки</span>
                <span>Предметы</span>
                <span>Банк</span>
                <span>Статус</span>
                <span>Просомтр</span>
            </div>
            <div className="games-history">
                {list.map(({ id, status, bank, player, items }, i) => <div className="panel" >
                    <span>#{id}</span>
                    <span>
                        <img src={player[0].src} />
                        VS
                        <img src={player[1].src} />
                    </span>
                    <span className="itemBet">
                        {items.map(v => <div className="item">
                            <img src={v.src} alt="The Frying Pan" />
                            <span>{v.price}</span>
                        </div>)}
                    </span>
                    <span>{bank}$</span>
                    <span>
                        {status.status
                            ? <>
                                <img src={player[status.win].src} />
                                <img src={player[status.win].src} />
                            </>
                            : "Игра не началась"}
                    </span>
                    <span>
                        <button onClick={() => { setLoadItemsId(i) }} data-bs-toggle="modal" data-bs-target="#checkGame">
                            <i class="bi bi-eye"></i>
                        </button>

                    </span>
                </div>
                )}
            </div>
            
        </div>
        <div class="modal fade" id="checkGame" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Игра #{list[LoadItemsId].id}</h5>
                        </div>
                        <div class="modal-body">
                            <div className="windowWinners">
                                {console.log(list[LoadItemsId])}
                                <div className="Win">
                                    <img src={list[LoadItemsId].player[0].src} />
                                    <span>{list[LoadItemsId].player[0].name}</span>
                                    <span>{list[LoadItemsId].player[0].chance}</span>
                                </div>
                                {/* Тут понетка подбрасывается */}
                                <div className="Win">
                                    <img src={list[LoadItemsId].player[1].src} />
                                    <span>{list[LoadItemsId].player[1].name}</span>
                                    <span>{list[LoadItemsId].player[1].chance}</span>
                                </div>
                            </div>
                            <div className="items">
                                <div>
                                    <div className="title">
                                        <span>{list[LoadItemsId].items.reduce((sum, cur) => cur.player == 0 ? sum + Number(cur.price) : sum, 0).toFixed(2)}$</span>
                                        <span>{list[LoadItemsId].items.filter(v => v.player == 0).length == 1 ? `1 предмет` : list[LoadItemsId].items.filter(v => v.player == 0).length < 5 ? `${list[LoadItemsId].items.filter(v => v.player == 0).length} предмета` : `${list[LoadItemsId].items.filter(v => v.player == 0).length} предметов`}</span>
                                        <span>Билеты: {list[LoadItemsId].player[0].ticket}</span>
                                    </div>
                                    <div className="item">
                                        <img />
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                                <div>
                                    <div className="title"> 
                                        <span>{list[LoadItemsId].items.reduce((sum, cur) => cur.player == 1 ? sum + Number(cur.price) : sum, 0).toFixed(2)}$</span>
                                        <span>{list[LoadItemsId].items.filter(v => v.player == 1).length == 1 ? `1 предмет` : list[LoadItemsId].items.filter(v => v.player == 1).length < 5 ? `${list[LoadItemsId].items.filter(v => v.player == 1).length} предмета` : `${list[LoadItemsId].items.filter(v => v.player == 1).length} предметов`}</span>
                                        <span>Билеты: {list[LoadItemsId].player[1].ticket}</span>
                                    </div>
                                    <div className="item">
                                        <img />
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    </div >

}

export default Coinflip