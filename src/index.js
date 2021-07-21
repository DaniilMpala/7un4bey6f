import { useState } from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import openSocket from 'socket.io-client';
import Cookies from 'js-cookie'
import "./style/style.scss"
import "./style/notification.scss"
import Header from './Components/Header'
import Rooms from './Components/Rooms'

import JackpotClassic from './Components/JackpotClassic'
import JackpotHigh from './Components/JackpotHigh'
import Top from './Components/Top'
import History from './Components/History'
import Ref from './Components/Ref'
import MyHistory from './Components/myHistory'
import Setting from './Components/Setting'
import Support from './Components/Support';

// import Chat from './Components/Chat'

function Index() {
    const [lock, setLock] = useState("container");
    const [active, setActive] = useState("");

    return (
        <Router>
            <div id="body" className={lock}>
                <div id="inner-body">

                    {/* <button onClick={this.Notification.bind(this, undefined)} ref={this.notification} className="notification">
                    <span ref={this.notificationText} className="notification__text"></span>
                </button> */}

                    <Header />
                    <Rooms setActive={setActive} active={active} />

                    <div className="main-block">

                        <Switch>
                            {/* <Route path="/Refferal" component={() => (<Refferal notification={this.Notification} isAuth={this.state.isAuth} />)} />
                            <Route path="/Support" component={() => (<Support notification={this.Notification} isAuth={this.state.isAuth} />)} /> */}

                            {/* <Route path="/Terms" component={Terms} />
                            <Route path="/Policy" component={Policy} /> */}

                            {/* <Route path="/Admin" component={() => (<Admin notification={this.Notification} connected={this.state.connected} isAuth={this.state.isAuth} socket={socket} />)} /> */}

                            <Route path="/" exact component={() => (<JackpotClassic type={'tf2'} />)} />
                            <Route path="/rust" exact component={() => (<JackpotClassic type={'rust'} />)} />
                            <Route path="/jackpothigh" exact component={() => (<JackpotHigh type={'tf2'} />)} />
                            <Route path="/rust/jackpothigh" exact component={() => (<JackpotHigh type={'rust'} />)} />

                            <Route path="/top" exact component={() => (<Top />)} />
                            <Route path="/history" exact component={() => (<History />)} />
                            <Route path="/ref" exact component={() => (<Ref />)} />
                            <Route path="/myhistory" exact component={() => (<MyHistory />)} />
                            <Route path="/support" exact component={() => (<Support />)} />
                            <Route path="/setting" exact component={() => (<Setting />)} />

                            {/* <Route path="/Withdraw" component={() => (<Withdraw notification={this.Notification} isAuth={this.state.isAuth} />)} />
                            <Route path="/Pay" component={() => (<Pay notification={this.Notification} isAuth={this.state.isAuth} />)} /> */}
                        </Switch>

                        {/* <Chat notification={this.Notification} connected={this.state.connected} isAuth={this.state.isAuth} socket={socket} /> */}
                    </div>

                </div>



            </div>
        </Router>
    );
}


ReactDOM.render(
    <Index />,
    document.getElementById('root')
)


