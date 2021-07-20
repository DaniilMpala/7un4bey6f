import { useState } from 'react'
import { Link } from "react-router-dom"
import "../style/header.scss"

function Header() {

    return <header>
        <div class="head-nav">
            <div>
                <span>НАЗВАНИЕ</span>
            </div>

            <div class="nav">
                <Link class="nav__item" to="/">Играть</Link>
                <Link class="nav__item" to="/top">Топ игроков</Link>
                <Link class="nav__item" to="/history">История игр</Link>
                <Link class="nav__item " to="/ref">Реферальная система</Link>
            </div>
        </div>

        <div class="nav-info">
            <div class="nav-info__item">
                <span class="nav-info__item-title">0</span>
                <span>Сейчас онлайн</span>
            </div>
            <div class="nav-info__item">
                <span class="nav-info__item-title">0</span>
                <span>Игр сегодня</span>
            </div>
            <div class="nav-info__item">
                <span class="nav-info__item-title">#190</span>
                <span>Последняя игра</span>
            </div>
            <div class="nav-info__item">
                <span class="nav-info__item-title">0</span>
                <span>Макс. выигрышь</span>
            </div>
            <div class="nav-info__item nav-info-profile">
                
                <div class="nav-info-profile__grid">
                    <img class="nav-info-profile__avatar" src="https://sun1-91.userapi.com/s/v1/ig1/iOkuSHYu5gOdsMa45_Qjun5fLsKNI0FsFhaBAX4N5rhU_OgfgbgoDXmDx5gAJ24C8xVUPHlW.jpg?size=50x0&quality=96&crop=0,0,1024,1024&ava=1"/>
                    <span  class="nav-info-profile__name" >Никнейм</span>
                    <a class="nav-info-profile__link logout" href="/logout">Выйти</a>
                    
                    <Link class="nav-info-profile__link" to="/myhistory">Мои игры</Link>
                    <Link class="nav-info-profile__link" to="/support">Тех. поддержка</Link>
                    <Link class="nav-info-profile__link" to="/setting">Настройка</Link>
                </div>
            </div>
        </div>
    </header>
}

export default Header