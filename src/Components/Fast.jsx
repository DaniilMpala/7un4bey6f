import React from "react";
import { useState } from "react";
import "../style/fast.scss";

const Fast = () => {
    const [LoadItemsId, setLoadItemsId] = useState(0);
    const [list, setList] = useState([
        {
            id: 1,
            bank: 22,
            status: {
                gamesEnd: true,
                win: 0,
            },
            players: [
                {
                    src: "https://sun1-91.userapi.com/s/v1/ig1/iOkuSHYu5gOdsMa45_Qjun5fLsKNI0FsFhaBAX4N5rhU_OgfgbgoDXmDx5gAJ24C8xVUPHlW.jpg?size=50x0&quality=96&crop=0,0,1024,1024&ava=1",
                    name: "frfgt",

                    chance: "49.50%",
                    ticket: "100-10000",
                    items: [
                        {
                            name: "grgtg",
                            src: "https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f",
                            price: "1.00",
                        },
                        {
                            name: "grgtg",
                            src: "https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f",
                            price: "1.00",
                        },
                    ],
                },
                {
                    src: "https://sun1-22.userapi.com/s/v1/if1/DqQ-7PU9OphwpL7XrQL1mtXat1Grvsy4jWj1PMwLZouiE7hOGjJAvXIzwBmWjdlFdkDN97hr.jpg?size=50x0&quality=96&crop=361,253,200,200&ava=1",
                    name: "frfgt",

                    chance: "49.50%",
                    ticket: "100-10000",
                    items: [
                        {
                            name: "grgtg",
                            src: "https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f",
                            price: "1.00",
                        },
                        {
                            name: "grgtg",
                            src: "https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f",
                            price: "1.00",
                        },
                        {
                            name: "grgtg",
                            src: "https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f",
                            price: "1.00",
                        },
                        {
                            name: "grgtg",
                            src: "https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f",
                            price: "1.00",
                        },
                        {
                            name: "grgtg",
                            src: "https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f",
                            price: "1.00",
                        },
                        {
                            name: "grgtg",
                            src: "https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f",
                            price: "1.00",
                        },
                        {
                            name: "grgtg",
                            src: "https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f",
                            price: "1.00",
                        },
                        {
                            name: "grgtg",
                            src: "https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f",
                            price: "1.00",
                        },
                    ],
                },
            ],
        },
    ]);

    const somethingGame = {
        id: 3,
        bank: "111",
        status: {
            gamesEnd: false,
            win: 1,
        },

        players: [
            {
                src: "https://sun1-91.userapi.com/s/v1/ig1/iOkuSHYu5gOdsMa45_Qjun5fLsKNI0FsFhaBAX4N5rhU_OgfgbgoDXmDx5gAJ24C8xVUPHlW.jpg?size=50x0&quality=96&crop=0,0,1024,1024&ava=1",
                name: "frfgt",
                chance: "33.50%",
                ticket: "100-10000",
                items: [
                    {
                        name: "grgtg",
                        src: "https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f",
                        price: "1.00",
                    },
                    {
                        name: "grgtg",
                        src: "https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f",
                        price: "1.00",
                    },
                ],
            },
        ],
    };

    const addNewGame = () => {
        setList([...list, somethingGame]);
    };
    return (
        <div class="fastgame">
            <div class="fastgame__set">
                <img src={`${process.env.PUBLIC_URL}/img/2arr.png`}></img>
                <span>
                    Fast game - быстрые игры для трех игроков. В 1х1х1 у вас всегда
                    хорошие шансы на победу! Делай ставку и забери ставку двух других
                    игроков!
                </span>
                <img src={`${process.env.PUBLIC_URL}/img/2arr.png`}></img>
                <span>
                    Количество игроков: 3<br />
                    <span className="fastgame__min-bet">
                        Размер ставки: 50 руб. - 800 руб.{" "}
                    </span>
                    ,
                    <br /> максимум предметов 10.
                </span>
                <img src={`${process.env.PUBLIC_URL}/img/2arr.png`}></img>
                <a
                    className="main-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    Поставить ставку
                </a>
            </div>
            {/* .....exampleModal..... */}
            <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                ВЫБЕРИТЕ СКИНЫ ДЛЯ ДЕПОЗИТА ИЗ СПИСКА
                            </h5>
                        </div>
                        <div class="modal-body">
                            <div class="choice">
                                <div>
                                    <span>
                                        <span className="fastgame__min-bet">
                                            Размер ставки: 50 руб. - 800 руб.{" "}
                                        </span>
                                        <br /> Максимум предметов 10.
                                        <br />
                                        Выберите предметы, и после нажмите "Депозит"{" "}
                                        <br />
                                        Вы получите обмен, который Вам нужно будет принять
                                    </span>
                                </div>
                                <div>
                                    <input
                                        type="button"
                                        class="main-btn"
                                        value="Поставить"
                                        onClick={addNewGame}
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    />
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
                                        <span title="gtgtgtgtg" className="title">
                                            gtgtgtgtg
                                        </span>
                                        <img
                                            src="https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f"
                                            alt="The Frying Pan"
                                        />
                                        <span>0.01</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fastgame__table">
                <div className="fastgame__games-history">
                    {list.map(({ id, status, bank, players }, i) => (
                        <div class="fastgame__panel fastgame-panel">
                            <div class="fastgame-panel__title">
                                Игра {i} # {id}
                            </div>

                            <div class="fastgame-panel__players">
                                <div class="fastgame-panel__player player-1">
                                    <div class="fastgame-panel__player-ava">
                                        <img src={players[0].src} alt="player-ava" />
                                    </div>
                                </div>

                                <div class="fastgame-panel__player player-2">
                                    {players[1] ? (
                                        <div class="fastgame-panel__player-ava ">
                                            <img src={players[1].src} alt="player-ava" />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div class="fastgame-panel__player player-3">
                                    <div class="fastgame-panel__player-ava ">
                                        {players[2] ? (
                                            <img src={players[2].src} alt="player-ava" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>

                                <div class="fastgame-panel__items">
                                    {players.map((player, i) => (
                                        <div
                                            class={`fastgame-panel__player-items player-${
                                                i + 1
                                            }`}
                                        >
                                            {player.items.map((item) => (
                                                <img src={item.src} alt="player-item" />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div class="fastgame-panel__chance">
                                {players.map((player) => (
                                    <div>{player.chance}</div>
                                ))}
                            </div>

                            <div class="fastgame-panel__winner-block">
                                {status.gamesEnd ? (
                                    <>
                                        <div>Победитель:</div>
                                        <div
                                            class={`fastgame-panel__winner-name player-${
                                                status.win + 1
                                            }`}
                                        >
                                            {players[status.win].name}
                                        </div>

                                        <div class="fastgame-panel__winner-status">
                                            <div>Выигрыш:</div> <div>{bank}</div>
                                        </div>
                                        <div class="fastgame-panel__winner-status">
                                            <div>Шанс:</div>{" "}
                                            <div>{players[status.win].chance}</div>
                                        </div>
                                    </>
                                ) : (
                                    <div>На кону: {bank}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Fast;
