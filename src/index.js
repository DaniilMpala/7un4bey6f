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
import Top from './Components/Top'
import History from './Components/History'
import Ref from './Components/Ref'
import MyHistory from './Components/myHistory'
import Setting from './Components/Setting'

// import Chat from './Components/Chat'

function Index() {
    const [lock, setLock] = useState("container");

    return (
        <Router>
            <div id="body" className={lock}>

                {/* <button onClick={this.Notification.bind(this, undefined)} ref={this.notification} className="notification">
                    <span ref={this.notificationText} className="notification__text"></span>
                </button> */}

                <Header />
                <Rooms />

                <div className="main-block">
                    
                    <Switch>
                        {/* <Route path="/Refferal" component={() => (<Refferal notification={this.Notification} isAuth={this.state.isAuth} />)} />
                            <Route path="/Support" component={() => (<Support notification={this.Notification} isAuth={this.state.isAuth} />)} /> */}

                        {/* <Route path="/Terms" component={Terms} />
                            <Route path="/Policy" component={Policy} /> */}

                        {/* <Route path="/Admin" component={() => (<Admin notification={this.Notification} connected={this.state.connected} isAuth={this.state.isAuth} socket={socket} />)} /> */}

                        <Route path="/" exact component={() => (<JackpotClassic />)} />
                        <Route path="/top" exact component={() => (<Top />)} />
                        <Route path="/history" exact component={() => (<History />)} />
                        <Route path="/ref" exact component={() => (<Ref />)} />
                        <Route path="/myhistory" exact component={() => (<MyHistory />)} />
                        <Route path="/setting" exact component={() => (<Setting />)} />
                        
                        {/* <Route path="/Withdraw" component={() => (<Withdraw notification={this.Notification} isAuth={this.state.isAuth} />)} />
                            <Route path="/Pay" component={() => (<Pay notification={this.Notification} isAuth={this.state.isAuth} />)} /> */}
                    </Switch>
                </div>

                {/* <Chat notification={this.Notification} connected={this.state.connected} isAuth={this.state.isAuth} socket={socket} /> */}
            </div>
        </Router>
    );
}


ReactDOM.render(
    <Index />,
    document.getElementById('root')
)


