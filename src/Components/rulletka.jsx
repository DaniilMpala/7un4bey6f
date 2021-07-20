import React from 'react'
import "../style/Rulletka.scss"

class Rulletka extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ruletka: { left: "0px" },
            data: this.props.dataUsers,
            victoryId: this.props.victory.Id,//Id на сайте
            krutilka: { __html: "" },
            genNum: 50,//количество иконок
            endProkrutka: false
        }
        this.rullet = React.createRef();
    }
    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };

    }
    componentDidMount() {
        //console.log('Рулетка началась')
        this.startRull()
    }
    updateRill() {
        this.setState({ krutilka: { __html: "" } });
        this.setState({ ruletka: { left: '0px' } });
    }
    async startRull() {
        this.updateRill()
        await this.delay(50);
        this.generate()
        var width = 80;
        
        this.setState({
            ruletka: {
                left: (- Math.ceil(this.state.genNum * 0.8) * width) - this.randInt(2, width - 2) + (this.rullet.current.offsetWidth / 2) + 'px',//+ this.randInt(2, width - 2) 
                width: Math.ceil(this.state.genNum) * width + 'px',//+ width * 8
                transition: "10s cubic-bezier(0.09, 0.62, 0.5, 0.96) 0s"
            }
        });
        setTimeout(() => {
            this.setState({ endProkrutka: true })
        }, 1000 * 10.1);
    }
    delay = millis => new Promise((resolve, reject) => {
        setTimeout(_ => resolve(), millis)
    });
    randInt(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
    generate() {
        //всего генерируем 50 иконок
        var getState = this.state.data
        //console.log(this.state)
        var returnHtml = []
        getState.forEach(e => {
            for (let i = 0; i < Math.ceil(this.state.genNum * (e.chance / 100)); i++) {
                returnHtml.push({
                    src: e.src,
                    Id: e.Id
                })
            }
        });
        //console.log('win - ', Math.ceil(this.state.genNum * 0.8), returnHtml[Math.ceil(this.state.genNum * 0.8)])
        this.shuffle(returnHtml)
        returnHtml[Math.ceil(this.state.genNum * 0.8)] = this.state.data.find(v => v.Id == this.state.victoryId)
        returnHtml = returnHtml.map(v => `<img className="imgRull" src="${v.src}"/>`)
        this.setState({ krutilka: { __html: returnHtml.join("") } });
    }
    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
    render() { 
        return (
            <div className="Rullet">
                <div className="random" ref={this.rullet}>
                    <img className="result" src="/img/3arr.png"/>
                    <div dangerouslySetInnerHTML={this.state.krutilka} className="cards" style={this.state.ruletka}></div>
                </div>
                {/* <button className="start" onClick={this.startRull.bind(this)}>START</button> */}
                {this.state.endProkrutka
                    ? <div className="winner">
                        <span className="profile">
                            <img src={this.props.victory.src} alt={this.props.victory.name} />
                            <div className="info">
                                <span className="desc">Победил(а):</span>
                                <span className="name">{this.props.victory.name}</span>
                                <span className="chance">с шансом {this.props.victory.chance}%</span>
                            </div>
                        </span>
                        <span className="bet-info">
                            Победил билет: {this.props.victory.tickets} 
                        </span>
                    </div> : ""}

            </div>
        )
    }
}

export default Rulletka;