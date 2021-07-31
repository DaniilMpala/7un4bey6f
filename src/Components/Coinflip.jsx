import { useState } from "react";

import "../style/coinflip.scss";

function Coinflip({ type }) {
    return (
        <div class="coinflip">
            <div class="classBetsSet">
                <img src={`${process.env.PUBLIC_URL}/img/2arr.png`}></img>
                <span>
                    Добро пожаловать в Coinflip (подброс монеты).В ней вы
                    сразитесь 1 на 1 <br /> с другим игроком при приблизительно
                    равных на победу шансах.
                </span>
                <img src={`${process.env.PUBLIC_URL}/img/2arr.png`}></img>
                <span>
                    <span class="minBet">Минимальная ставка 0.2$</span>,<br />{" "}
                    максимум предметов 15.{" "}
                </span>
                <img src={`${process.env.PUBLIC_URL}/img/2arr.png`}></img>
                <a
                    class="main-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    Поставить ставку
                </a>
            </div>
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
                                Создание игры
                            </h5>
                        </div>
                        <div class="modal-body">
                            <div class="choice">
                                <div>
                                    <span>
                                        Минимальная ставка 0.2$,максимум
                                        предметов 15.
                                        <br />
                                        Выберите сторону, если это необходимо и
                                        после нажмите "Депозит" <br />
                                        Вы получите обмен, который Вам нужно
                                        будет принять
                                    </span>
                                </div>
                                <div class="choiceCommand">
                                    <div class="sides">
                                        <div class="left-side"></div>
                                        <div class="right-side selected"></div>
                                    </div>
                                    <button type="button" class="main-btn">
                                        Поставить
                                    </button>
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

                                <div class="cf-inventory-body">
                                    <div
                                        class="cf-item"
                                        data-id="440_7871538233"
                                    ></div>
                                </div>
                                <div
                                    class="cf-item-image"
                                    style={{
                                        "border-top": "1px solid #bc0000",
                                    }}
                                >
                                    <img
                                        src="https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEKYAsuTRrshzRCms_jQ6rbCuFVyYxg5scG3TA8wwcoNrCwNTIydAaSU_IPWaZoplu-DCFlvpItRNmxipi1bWo/110fx75f"
                                        alt="The Frying Pan"
                                    />
                                </div>
                                <div class="cf-item-price">
                                    <span>0.01</span>
                                </div>
                                <div class="cf-item-name">The Back Scatter</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* накидываешь либо win-first либо win-second, в зависимости от того кто выиграл */}
            <div class="coin win-first">
                <div className="coin__container">
                    <div className="coin__body">
                        <div className="coin__back-container">
                            <div class="coin__back" />
                        </div>
                        <div className="coin__front-container">
                            <div class="coin__front" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Coinflip;
