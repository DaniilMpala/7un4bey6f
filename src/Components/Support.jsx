import React from 'react'
import "../style/support.scss"

const Support = () => {
    return (

        <div className="support-chat">
            <div className="support-chat__row">
                <div className="support-chat__header">
                    <div className="support-chat__title">Начните ваш диалог с поддержкой написав нам первое сообщение:</div>

                </div>
                <div className="support-chat__messages messages">
                    <div className="messages__body">
                        <div className="messages__row">

                            <div className="messages__item item my-message">
                                <div className="item__body">
                                    <div className="item__grid">

                                        <div className="item__name">Danila</div>

                                        <div className="item__msg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis veniam cumque sit architecto perspiciatis quo placeat officia maxime hic, ex fuga laborum eveniet. Atque tenetur temporibus suscipit voluptatibus earum architecto!</div>
                                    </div>
                                </div>
                            </div>

                            <div className="messages__item item">
                                <div className="item__body">
                                    <div className="item__grid">

                                        <div className="item__name">Danila</div>

                                        <div className="item__msg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis veniam cumque sit architecto perspiciatis quo placeat officia maxime hic, ex fuga laborum eveniet. Atque tenetur temporibus suscipit voluptatibus earum architecto!</div>
                                    </div>
                                </div>
                            </div>

                            <div />
                        </div>
                    </div>
                </div>
                <div className="support-chat__send send">
                    <textarea className="send__text main-input" cols="30" rows="4" placeholder="Ваше сообщение" type="text" name="send_text" />

                    <input className="send__attach-photo" type="file" size="3" multiple accept="image/*" />
                    <label className="send__attach-photo-icon" for="file">
                        <img src="img/attach_image.svg" alt="send" />
                    </label>


                    <button className="send__btn main-btn">
                        <img src="img/send_icon.svg" alt="send" />
                    </button>
                </div>
            </div>

        </div>

    )
}

export default Support
