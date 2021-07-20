import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
import ax from 'axios'
import cookie from 'cookie'
import QiwiBillPaymentsAPI from '@qiwi/bill-payments-node-js-sdk'
import { callbackApi } from 'node-qiwi-api';
// import { YMApi } from "yoomoney-sdk";
import cluster from 'cluster'

const SECRET_KEY = 'eyJ2ZXJzaW9uIjoiUDJQIiwiZGF0YSI6eyJwYXlpbl9tZXJjaGFudF9zaXRlX3VpZCI6Im00NjI3eC0wMCIsInVzZXJfaWQiOiI3OTI2NDA0MTE2NiIsInNlY3JldCI6IjllZGUxZTM1OTkxMjkzZTdjYzlhN2JiMmUwZWU5Yjg3NDZkNTg2ZjM5OWI4NzVhNmJmMGE3ODgxM2ZmYWU5OTcifX0=';
const qiwiRestApi = new QiwiBillPaymentsAPI(SECRET_KEY);
var asyncWallet = new callbackApi("19f70b35e8e0e0e3407f5a54959d38e1");//https://qiwi.com/api
// const SECRET_YMONEY = "4100111029570711.2D24B443C0484BE841476DD80D00B6522BAED51DCDC8A48B39C20FC180C2EB652423918B613231085B456634E88C5BD691A847C775A0863A187B6C21AF726559235D7E746209F4616B28A15D5823EE6AA826868365E7A0DC7842706C3F9161AC392493D4C1FD88BA7841A9C423D84506D99A672552B93829FDD2F7EB5B9E998D"
// const api = new YMApi(SECRET_YMONEY);

// api.accountInfo().then(console.log);

var profitUser = 0
var antiMinus_OtMoney = 0//от какого минуса начинает работать антиминус 
//ниже проценты того что сработает антиминус
var percentDice = 10
var percentCrash = 10
var percentx50 = 6//идеал 6%

setInterval(() => {
    if (cluster.worker?.id == 1)
        console.log('profitUser: ', profitUser)
}, 1000);
var firstStart = true;
var io = undefined;
var db;
var Rooms = {
    "Jackpot": {
        "idGame": 0,
        "getAllStavka_Summa": 0,//общий банк
        "listUsersWon": {},//пользователи с фото и суммой ставкой и шансом
        "usersRunBets": [],//все ставки
        "victory": {
            Id: 0,
            name: "",
            src: "",
            tickets: 0,
            chance: 0
        },
        "processVictory": false,
        "acceptsBets": true,
        "VsegoTickets": 0,
        "TimerStart": false,
        "timer": 20,
        "twistGame": { status: false, winId: null },
    },
    "x50": {
        "getAllStavka_Summa": 0,//общий банк
        "userBets": {
            "x2": [],
            "x3": [],
            "x5": [],
            "x50": [],
        },
        "allBets": {
            "x2": [],
            "x3": [],
            "x5": [],
            "x50": [],
        },
        "victoryX": "",
        "processVictory": false,
        "TimerStart": false,
        "rotateDeg": 0,
        "acceptsBets": true,
        "getAllStavka_Summa": 0,//общий банк
        "timer": 20,
        "twistGame": { status: false, winX: null },
    },
    "Crash": {
        "XkoF": 1.00,
        "processVictory": false,
        "stopCrash": false,
        "TimerStart": false,
        "allBets": [],
        "acceptsBets": true,
        "getAllStavka_Summa": 0,//общий банк
        "timer": 15,
        "twistGame": { status: false, winX: null },
        "fullWinsSumma": 0
    },
};

(async () => {
    db = await open({
        filename: 'database.db',
        driver: sqlite3.Database
    })
})()

export const ioSet = (ioS) => {
    io = ioS
    if (firstStart) {
        firstStart = false
        startTimer(20, "x50")
        startTimer(15, "Crash")
    }
}
setInterval(async () => {
    //{ countUser: io.sockets.sockets.size, ...(await getRoomsInfo()) }
    if (io) {
        io.emit('roomsInfo', await getRoomsInfo());
        io.emit('onlineUsers', io.sockets.sockets.size);
    }
}, 250);

const allSend = async (data) => {
    io.to(data.game).emit(data.title, data.data);
}
// process.on('message', async function (data) {
//     if (data.RoomsInfo) io.emit('roomsInfo', data.RoomsInfo);
//     io.to(data.game).emit(data.title, data.data);
// });
export const getRoomsInfo = async () => {
    return {
        Jackpot: { summa: Rooms.Jackpot.getAllStavka_Summa, time: Rooms.Jackpot.processVictory ? null : Rooms.Jackpot.timer },
        x50: { summa: Rooms.x50.getAllStavka_Summa, time: Rooms.x50.processVictory ? null : Rooms.x50.timer },
        Crash: { summa: Rooms.Crash.getAllStavka_Summa, time: Rooms.Crash.processVictory ? null : Rooms.Crash.timer }
    }
}
const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
});
const startTimer = async (time, typeGame, balanceWinners) => {
    Rooms[typeGame].timer = time
    Rooms[typeGame].TimerStart = true
    while (Rooms[typeGame].timer > 1) {
        Rooms[typeGame].timer -= 1
        await allSend({
            title: "timer",
            game: typeGame,
            data: {
                time: Rooms[typeGame].timer,
                startTime: time,
                acceptsBets: Rooms[typeGame].acceptsBets
            }
        });
        await delay(1000)
        //console.log(Rooms[typeGame].timer)
    }
    if (time == 13 || time == 7) { Rooms[typeGame].TimerStart = false; endgame[typeGame](balanceWinners) }//13 сек конец игры
    else { Rooms[typeGame].TimerStart = false; determinationOfTheWinner[typeGame]() }

}


const endgame = {
    async Crash() {
        console.log('Crash')
        await allSend({
            title: "endGame",
            game: "Crash",
            data: {
                "time": 15,
            }
        });
        await allSend({
            title: "clearBets",
            game: "Crash",
            data: {}
        });
        Rooms.Crash = {
            "XkoF": 1.00,
            "processVictory": false,
            "stopCrash": false,
            "TimerStart": false,
            "allBets": [],
            "acceptsBets": true,
            "getAllStavka_Summa": 0,//общий банк
            "timer": 15,
            "twistGame": { status: false, winX: null },
            "fullWinsSumma": 0
        }
        startTimer(15, "Crash")
    },
    async x50(updateUsersBalance) {
        await allSend({
            title: "endGame",
            game: "x50",

            data: {
                "time": 20,
                "newHistory": { XWin: Rooms.x50.victoryX }
            }
        });

        for (let i in updateUsersBalance) {
            await allSend({
                title: "updateBalance",
                game: updateUsersBalance[i].socketId,
                data: {
                    balance: updateUsersBalance[i].balance,
                    status: true,
                    winners: "x50"
                }
            });
            await allSend({
                title: "infoUser",
                game: updateUsersBalance[i].socketId,
                data: {
                    balance: updateUsersBalance[i].balance,
                    status: true
                }
            });
        }
        Rooms.x50 = {
            "userBets": {
                "x2": [],
                "x3": [],
                "x5": [],
                "x50": [],
            },
            "allBets": {
                "x2": [],
                "x3": [],
                "x5": [],
                "x50": [],
            },
            "rotateDeg": Rooms.x50.rotateDeg,
            "victoryX": "",
            "processVictory": false,
            "TimerStart": false,
            "acceptsBets": true,
            "twistGame": { status: false, winX: null },
            "getAllStavka_Summa": 0,//общий банк
            "timer": 20,
        }
        startTimer(20, "x50")
    },
    async Jackpot(balance) {
        await allSend({
            title: "endGame",
            game: "Jackpot",
            data: {
                "time": 20,
                "history": {
                    src: Rooms.Jackpot.victory.src,
                    name: Rooms.Jackpot.victory.name,
                    idGame: Rooms.Jackpot.idGame,
                    summWin: Rooms.Jackpot.getAllStavka_Summa,
                    chanceWinner: Rooms.Jackpot.victory.chance
                }
            }
        });
        await allSend({
            title: "updateBalance",
            game: Rooms.Jackpot.victory.socketId,
            data: {
                balance: balance,
                status: true,
                winners: "Jackpot",
            }
        });
        await allSend({
            title: "infoUser",
            game: Rooms.Jackpot.victory.socketId,
            data: {
                balance: balance,
                status: true
            }
        });

        Rooms.Jackpot = {
            "idGame": 0,
            "getAllStavka_Summa": 0,//общий банк
            "listUsersWon": {},//пользователи с фото и суммой ставкой и шансом
            "usersRunBets": [],//все ставки
            "victory": {
                Id: 0,
                name: "",
                src: "",
                tickets: 0,
                chance: 0
            },
            "processVictory": false,
            "acceptsBets": true,
            "VsegoTickets": 0,
            "TimerStart": false,
            "timer": 20,
            "twistGame": { status: false, winId: null },
        }
    }
}
const checkWinnerCrash = async (xKofNow) => {
    await Promise.all(Rooms.Crash.allBets.map(async bet => {
        if (xKofNow > bet.kof && bet.status == null) {
            var takeBalance = round(bet.stavka * bet.kof)
            Rooms.Crash.fullWinsSumma += takeBalance
            bet.status = `Выиграл ${takeBalance}`
            profitUser += takeBalance
            var balance = await updateBalanceUser(bet.IdUser, { plusBalance: takeBalance })
            await allSend({
                title: "updateBalance",
                game: bet.socketID,
                data: {
                    balance: balance,
                    status: true,
                    winners: "Crash"
                }
            });
            await allSend({
                title: "infoUser",
                game: bet.socketID,
                data: {
                    balance: balance,
                    status: true
                }
            });
            await allSend({
                title: "takingStavka",
                game: bet.socketID,
                data: {
                    takeBal: takeBalance,
                }
            });
            await allSend({
                title: "crash_bet",
                game: bet.socketID,
                data: {
                    kofBet: bet.kof,
                    stavka: takeBalance,
                    accesReturn: false,
                    setStavka: true
                }
            });
        }
    }))
    await allSend({
        title: "newStavkaCrash",
        game: "Crash",
        data: {
            bet: Rooms.Crash.allBets
        }
    });
}
const crashProgress = async () => {
    //логика псведа рандом
    //randInt(0, 100) < 98
    var checkAntiMinus = profitUser > antiMinus_OtMoney && Rooms.Crash.allBets.length > 0 && !Rooms.Crash.twistGame.status
        ? (randInt(1, 101) > 100 - percentCrash)
        : false
    if (checkAntiMinus) {
        Rooms.Crash.twistGame.winX = 1
        Rooms.Crash.twistGame.status = true
        console.log(`АНТИМИНУС CRASH`)
    }
    while (Rooms.Crash.XkoF < 100 && Rooms.Crash.twistGame.status ? Rooms.Crash.XkoF < Rooms.Crash.twistGame.winX : randInt(1, 1001) <= 985) {//если выпало число которое входит в 98% чисел то продолжаем
        Rooms.Crash.XkoF = Rooms.Crash.twistGame.status
            ? round(Rooms.Crash.XkoF + 0.01 * Math.floor(Rooms.Crash.XkoF)) > Rooms.Crash.twistGame.winX
                ? Rooms.Crash.twistGame.winX
                : round(Rooms.Crash.XkoF + 0.01 * Math.floor(Rooms.Crash.XkoF))
            : round(Rooms.Crash.XkoF + 0.01 * Math.floor(Rooms.Crash.XkoF))

        await allSend({
            title: "kofX",
            game: "Crash",
            data: {
                kof: Rooms.Crash.XkoF,
                crashStarted: true
            }
        })


        checkWinnerCrash(Rooms.Crash.XkoF)
        //console.log(Rooms.Crash.XkoF)
        await delay(150)
    }
    Rooms.Crash.stopCrash = true

    await db.run(
        `INSERT INTO historyGame_Crash (betJSON, stopX, Winners, fullWinsSumma, twist) 
        VALUES ('${JSON.stringify(Rooms.Crash.allBets)}', '${Rooms.Crash.XkoF}', '${JSON.stringify(Rooms.Crash.allBets.filter(v => v.status != null))}', ${Rooms.Crash.fullWinsSumma}, ${Rooms.Crash.twistGame.winX})`
    )

    await allSend({
        title: "kofX",
        game: "Crash",
        data: {
            kof: Rooms.Crash.XkoF,
            stopCrash: true,
        }
    });



    startTimer(7, "Crash")

    //stopProgreff отсылаем всем
}

const determinationOfTheWinner = {
    async Crash() {
        console.log('Crash')

        Rooms.Crash.acceptsBets = false;
        Rooms.Crash.processVictory = true;

        await allSend({
            title: "startGame",
            game: "Crash",

            data: {}
        });

        profitUser -= Rooms.Crash.getAllStavka_Summa

        crashProgress()
    },
    async x50() {
        console.log('determinationOfTheWinnerx50')
        Rooms.x50.acceptsBets = false;
        Rooms.x50.processVictory = true;

        var bd = {
            "x2": [10, 23, 35, 49, 63, 76, 90, 103, 116, 130, 143, 156, 170, 183, 197, 210, 223, 236, 252, 263, 276, 290, 302, 317, 329, 343],
            "x3": [17, 30, 43, 83, 97, 110, 150, 164, 177, 190, 204, 244, 257, 270, 310, 323, 337],
            "x5": [4, 56, 70, 123, 137, 217, 230, 283, 297, 349],
            "x50": [356],
        }
        var allDeg = [...bd["x2"], ...bd["x3"], ...bd["x5"], ...bd["x50"]]

        //АНТИМИНУС
        if (profitUser > antiMinus_OtMoney && Rooms.x50.getAllStavka_Summa > 0 && !Rooms.x50.twistGame.status) {
            if (randInt(1, 101) > 100 - percentx50) {
                var twits = { nameX: "", summa: 0 }//наименьшая сумма
                var allRoomsWhere0 = []//все компанты в которых нет ставок
                //ищем наименьшую сумму
                for (let name in Rooms.x50.userBets) {
                    var summAll = Rooms.x50.userBets[name].reduce((sum, cur) => sum + cur.summaBets, 0)
                    if (twits.summa > summAll) twits = { nameX: name, summa: summAll }
                    if (summAll == 0) allRoomsWhere0.push(name)
                }
                if (allRoomsWhere0.length > 0) Rooms.x50.twistGame.winX = allRoomsWhere0[randInt(0, allRoomsWhere0.length)]
                else Rooms.x50.twistGame.winX = twits.nameX

                Rooms.x50.twistGame.status = true
                console.log(`АНТИМИНУС X50, ${twits.nameX}, ${twits.summa}, Выбор из рандомна пустых ставок: ${allRoomsWhere0.length > 0}`)
            }
        }
        //Подкрутка
        if (!Rooms.x50.twistGame.status) var i = randInt(0, allDeg.length)
        else {
            var BD_i = randInt(0, bd[Rooms.x50.twistGame.winX].length)
            var i = allDeg.findIndex(v => v == bd[Rooms.x50.twistGame.winX][BD_i])
            console.log('Подкрутка x50', Rooms.x50.twistGame.winX)
        }

        Rooms.x50.rotateDeg += (360 - Rooms.x50.rotateDeg % 360) + 360 * 2 + allDeg[i]
        Rooms.x50.victoryX = Object.entries(bd).find(v => ~v[1].indexOf(allDeg[i]))[0]

        var updateUsersBalance = []
        var usersWinJSON = []
        var summaWinAll = 0
        for (let i = 0; i < Rooms.x50.userBets[Rooms.x50.victoryX].length; i++) {
            var balance = await updateBalanceUser(Rooms.x50.userBets[Rooms.x50.victoryX][i].IdUser, { plusBalance: Rooms.x50.userBets[Rooms.x50.victoryX][i].summaBets * Number(Rooms.x50.victoryX.split('x')[1]) })//
            updateUsersBalance.push({
                balance: balance,
                socketId: Rooms.x50.userBets[Rooms.x50.victoryX][i].socketId
            })
            usersWinJSON.push({
                idUser: Rooms.x50.userBets[Rooms.x50.victoryX][i].IdUser,
                placeBets: Rooms.x50.userBets[Rooms.x50.victoryX][i].summaBets,
                winnerMoney: Rooms.x50.userBets[Rooms.x50.victoryX][i].summaBets * Number(Rooms.x50.victoryX.split('x')[1])
            })
            summaWinAll += Rooms.x50.userBets[Rooms.x50.victoryX][i].summaBets * Number(Rooms.x50.victoryX.split('x')[1])
        }

        profitUser -= Rooms.x50.getAllStavka_Summa
        profitUser += summaWinAll

        var get = await db.run(
            `INSERT INTO historyGame_x50 (usersWinJSON, XWin, summaWin, twist) 
            VALUES ('${JSON.stringify(usersWinJSON)}', '${Rooms.x50.victoryX}', ${Number(summaWinAll.toFixed(2))}, '${Rooms.x50.twistGame.winX}')`
        )

        await allSend({
            title: "getWinner",
            game: "x50",
            data: {
                rotateDeg: `rotate(${Rooms.x50.rotateDeg}deg)`,
            }
        });
        console.log(Rooms.x50.victoryX)
        startTimer(13, "x50", updateUsersBalance)
    },
    async Jackpot() {
        console.log('determinationOfTheWinnerJackpot')
        Rooms.Jackpot.acceptsBets = false;
        Rooms.Jackpot.processVictory = true;

        //Подкрутка
        if (!Rooms.Jackpot.twistGame.status) var tick = randInt(1, Rooms.Jackpot.VsegoTickets)
        else {
            var search = Rooms.Jackpot.usersRunBets.find(v => v.Id == Rooms.Jackpot.twistGame.winId)
            if (search) {
                console.log('Подкрутка', search.Id, search.tikets.split('-')[0], search.tikets.split('-')[1])
                var tick = randInt(Number(search.tikets.split('-')[0]), Number(search.tikets.split('-')[1]))
            } else {
                console.log('Не удалось подкрутить ибо не нашли этого пользователя')
                var tick = randInt(1, Rooms.Jackpot.VsegoTickets)
            }
        }
        //----------------

        for (let i = 0; i < Rooms.Jackpot.usersRunBets.length; i++) {
            console.log(tick, Rooms.Jackpot.usersRunBets[i].tikets.split('-')[0], Rooms.Jackpot.usersRunBets[i].tikets.split('-')[1])
            if (Rooms.Jackpot.usersRunBets[i].tikets.split('-')[0] <= tick && Rooms.Jackpot.usersRunBets[i].tikets.split('-')[1] >= tick) {
                console.log('Нашли выигрышный билет', Rooms.Jackpot.usersRunBets[i])
                Rooms.Jackpot.victory = {
                    Id: Rooms.Jackpot.usersRunBets[i].Id,
                    name: Rooms.Jackpot.usersRunBets[i].name,
                    src: Rooms.Jackpot.usersRunBets[i].src,
                    tickets: tick,
                    chance: Rooms.Jackpot.listUsersWon[Rooms.Jackpot.usersRunBets[i].Id].chance * 100,
                    socketId: Rooms.Jackpot.listUsersWon[Rooms.Jackpot.usersRunBets[i].Id].socketId,
                }
                console.log("win", Rooms.Jackpot.victory)
                //выдадим массив прокрутки
                var allStavki = []
                for (let id in Rooms.Jackpot.listUsersWon) {
                    allStavki.push({
                        name: Rooms.Jackpot.usersRunBets.find(v => v.Id == id).name,
                        src: Rooms.Jackpot.listUsersWon[id].src,
                        chance: Rooms.Jackpot.listUsersWon[id].chance * 100,
                        Id: id,
                    })
                }
                await allSend({
                    title: "getWinner",
                    game: "Jackpot",
                    data: {
                        victory: Rooms.Jackpot.victory,
                        data: allStavki
                    }
                });

                var get = await db.run(
                    `INSERT INTO historyGame_Jackpot (srcWin, nameWin, chanceWin, summaWin, ticketsWin, idWin, twist) 
                    VALUES ('${Rooms.Jackpot.victory.src}', '${Rooms.Jackpot.victory.name}', ${Rooms.Jackpot.victory.chance}, ${Rooms.Jackpot.getAllStavka_Summa}, ${Rooms.Jackpot.victory.tickets}, ${Rooms.Jackpot.victory.Id}, ${Rooms.Jackpot.twistGame.winId})`
                )
                Rooms.Jackpot.idGame = get.lastID

                //0.95 (5% коммиссия при выиграше)
                profitUser -= Rooms.Jackpot.getAllStavka_Summa * 0.05
                var balance = await updateBalanceUser(Rooms.Jackpot.victory.Id, { plusBalance: Rooms.Jackpot.getAllStavka_Summa * 0.95 })
                console.log(2)
                startTimer(13, "Jackpot", balance)

                break;
            }
        }
    }
}

const randInt = (min, max) => Math.floor(min + Math.random() * (max - min))
const randStr = (c) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < c; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export const createPay = async (XCSRFToken, summa, type) => {
    var user = (await db.get(`SELECT id, expireToken,first_name,last_name,PersonIdWhoInvited FROM Users WHERE XCSRFToken = '${XCSRFToken}'`))
    if (user) {
        if (user.expireToken > new Date().getTime()) {
            if (type == "qiwi" || type == "card") return await qiwi(user, summa)
        } return { message: "Сессия истекла" }
    } return { message: "Нет такого юзера" }
}
const qiwi = async (user, summa) => {
    const billId = qiwiRestApi.generateId()

    const fields = {
        amount: round(summa),
        currency: 'RUB',
        comment: 'test',
        expirationDateTime: new Date(new Date().getTime() + 1000 * 60 * 30),
        // customFields: {
        //     CHECKOUT_REFERER: 'http://grgrgrg/'
        //   }
    };

    var data = await qiwiRestApi.createBill(billId, fields)
    console.log(data)
    if (!data.errorCode) {
        await db.run(`
            INSERT INTO payment (userId, deposit, name, status, dataCreate, billId) 
            VALUES (${user.id}, '${round(summa)}', '${`${user.first_name} ${user.last_name}`}', 'Ожидание оплаты', ${new Date().getTime()}, '${billId}')
         `);
        chekPay(billId, user.id, user.PersonIdWhoInvited)
        return { url: data.payUrl }
    }
    else { message: "Ошибка оплаты" }
}
export const chekPay = async (billId, userId, PersonIdWhoInvited) => {
    var data = { description: undefined };
    var startChekTime = new Date().getTime()
    do {
        await delay(1000 * 20)
        data = await qiwiRestApi.getBillInfo(billId)
        console.log(data)
        if (data.description) { console.log(data); break; }
        if (startChekTime + 1000 * 60 * 60 < new Date().getTime()) { data['description'] = "Ожидание истекло"; break; }
    } while (data['description'] == undefined && data.status.value == "WAITING")
    console.log(data)
    if (data.description) {
        await db.run(`UPDATE payment SET status = 'Ошибка оплаты' WHERE billId = '${billId}'`)
    } else if (data.status.value == "PAID") {
        console.log(billId, userId, PersonIdWhoInvited)
        await db.run(`UPDATE payment SET status = 'Зачислен' WHERE billId = '${billId}'`)
        await updateBalanceUser(userId, { plusBalance: Number(data.amount.value) })
        if (PersonIdWhoInvited) await updateBalanceUser(PersonIdWhoInvited, { plusBalance: round(data.amount.value * 0.1) })

    } else if (data.status.value == "REJECTED") {
        await db.run(`UPDATE payment SET status = 'Отклонен' WHERE billId = '${billId}'`)
    } else if (data.status.value == "EXPIRED" || data.status.value == "WAITING") {
        await db.run(`UPDATE payment SET status = 'Ожидание оплаты истекло' WHERE billId = '${billId}'`)
    }

}
export const deletePromo = async (XCSRFToken, idPromo) => {
    var admin = (await db.get(`SELECT admin FROM Users WHERE XCSRFToken = '${XCSRFToken}'`)).admin
    if (!admin) return { message: "нет доступа" }

    await db.run(`DELETE FROM promoCode WHERE id = ${idPromo}`)
    return "Успешно удалено"
}
export const updateUser = async (XCSRFToken, teg, val, id) => {
    var admin = (await db.get(`SELECT admin FROM Users WHERE XCSRFToken = '${XCSRFToken}'`)).admin
    if (!admin) return { message: "нет доступа" }

    teg = teg.replace(':', '').trim()
    try {
        if (teg == 'ban') await db.run(`UPDATE Users SET ${teg} = ${val}, XCSRFToken=''  WHERE id = ${id}`)
        else await db.run(`UPDATE Users SET ${teg} = ${val} WHERE id = ${id}`)
        return "Успешно"
    } catch (error) {
        console.log(error)
    }


}

export const gettingAllMessage = async (XCSRFToken) => {
    if (XCSRFToken) {
        var user = await getDateUser(XCSRFToken, "id, admin")
        if (user) {
            var getAll = await db.all(`SELECT text, userName, idUser, avatar FROM chat ORDER BY id DESC LIMIT 40`)
            getAll = getAll.map(v => {
                if (v.idUser == user.id) {
                    delete v['idUser']
                    return {
                        my: true,
                        ...v
                    }
                } else return v
            })
            return { mes: getAll, xadT: user.admin }
        } else return []
    } else return { mes: await db.all(`SELECT text, userName, avatar FROM chat ORDER BY id DESC LIMIT 40`) }
}





export const withdraw = async (XCSRFToken, { vivod, type, adress }) => {
    var user = (await db.get(`SELECT id, expireToken, balance FROM Users WHERE XCSRFToken = '${XCSRFToken}'`))
    if (user) {
        if (user.balance < vivod) return { message: "У вас баланс меньше запрошенного вывода" }
        if (user.expireToken > new Date().getTime()) {
            if (vivod >= 98) {//98
                return await requestWithdrow(user, vivod, adress, type)
            } return { message: "Минимальный вывод 98" }
        } return { message: "Сессия истекла" }
    } return { message: "Нет такого юзера" }
}
const requestWithdrow = async (user, vivod, adressWithdraw, type) => {
    var minusBalance = 0
    if (type == "qiwi") minusBalance = round(vivod * 100 / 98)
    else if (type == "card") minusBalance = round(vivod * 100 / 96 + 50)
    try {
        await updateBalanceUser(user.id, { minusBalance: minusBalance })
        await db.run(`
    INSERT INTO withdraw (type, adressWithdraw, summa, status, createWithdraw, idUser) 
    VALUES ('${type}', '${adressWithdraw}', '${vivod}', 'На рассмотрении', ${new Date().getTime()}, ${user.id})
    `);
        return { message: "Заявка на вывод подана" }
    } catch (error) {
        console.log(error)
        return { message: "Ошибка вывода" }
    }

}
export const seccessWithdraw = async (XCSRFToken, id) => {
    var admin = (await db.get(`SELECT admin, id FROM Users WHERE XCSRFToken = '${XCSRFToken}'`))
    if (!admin.admin) return { message: "нет доступа" }

    var requestWithdraw = await db.get(`SELECT * FROM withdraw WHERE id = '${id}'`)
    switch (requestWithdraw.type) {
        case "qiwi":
            qiwiWithdrow(requestWithdraw.id, requestWithdraw.summa, requestWithdraw.adressWithdraw)
            return { message: "Заявка создана" }
        case "card":
            qiwiWithdrowCARD(requestWithdraw.id, requestWithdraw.summa, requestWithdraw.adressWithdraw)
            return { message: "Заявка создана" }
    }
    return { message: "Не предвиденная ошибка" }
}
export const cancelWithdraw = async (XCSRFToken, id) => {
    var admin = (await db.get(`SELECT admin, id FROM Users WHERE XCSRFToken = '${XCSRFToken}'`))
    if (!admin.admin) return { message: "нет доступа" }

    var info = await db.get(`SELECT idUser, summa, type FROM withdraw WHERE id = ${id}`)

    var minusBalance = 0
    if (info.type == "qiwi") minusBalance = round(info.summa * 100 / 98)
    else if (info.type == "card") minusBalance = round(sinfo.summa * 100 / 96 + 50)

    await updateBalanceUser(info.idUser, { plusBalance: minusBalance })
    await db.run(`UPDATE withdraw SET status = 'Отменено администратором обратитесь в тех. поддержку' WHERE id = ${id}`)
    return { message: "Успешно отменено" }
}
const qiwiWithdrowCARD = async (id, vivod, number) => {
    number = number.replace(" ").trim()

    console.log({ amount: String(round(vivod)), comment: '', account: number })
    asyncWallet.toCard({ amount: String(round(vivod)), comment: '', account: number }, async (err, data) => {
        if (err) {
            var info = await db.get(`SELECT idUser, summa, type FROM withdraw WHERE id = ${id}`)

            var minusBalance = 0
            if (info.type == "qiwi") minusBalance = round(info.summa * 100 / 98)
            else if (info.type == "card") minusBalance = round(sinfo.summa * 100 / 96 + 50)

            await updateBalanceUser(info.idUser, { plusBalance: minusBalance })

            await db.run(`UPDATE withdraw SET status = '${err.message}' WHERE id = ${id}`)
            console.log(err)
        } else {
            //обнволение базы
            console.log('data.transaction', data.transaction);
            if (data.transaction.state.code == 'Accepted') await db.run(`UPDATE withdraw SET status = 'Выведено' WHERE id = ${id}`)
        }
    })

}
const qiwiWithdrow = async (id, vivod, phone) => {
    phone = phone.replace(" ").trim()
    if (validatePhone(phone) && phone) {
        console.log({ amount: String(round(vivod)), comment: '', account: phone })
        asyncWallet.toWallet({ amount: String(round(vivod)), comment: '', account: phone }, async (err, data) => {
            if (err) {
                var info = await db.get(`SELECT idUser, summa, type FROM withdraw WHERE id = ${id}`)

                var minusBalance = 0
                if (info.type == "qiwi") minusBalance = round(info.summa * 100 / 98)
                else if (info.type == "card") minusBalance = round(sinfo.summa * 100 / 96 + 50)

                await updateBalanceUser(info.idUser, { plusBalance: minusBalance })
                await db.run(`UPDATE withdraw SET status = '${err.message}' WHERE id = ${id}`)
                console.log(err)
            } else {
                //обнволение базы
                console.log('data.transaction', data.transaction);
                if (data.transaction.state.code == 'Accepted') await db.run(`UPDATE withdraw SET status = 'Выведено' WHERE id = ${id}`)
            }
        })
    } else {
        await db.run(`UPDATE withdraw SET status = 'Не правильный формат телефона +7...' WHERE id = ${id}`)
        return { message: "Телефон должен начинаться с +7 ..." }
    }
}
async function validatePhone(phone) {
    let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return regex.test(phone);
}




export const sendMes = async (socket, XCSRFToken, text, podpicAdmin) => {
    text = text.trim()
    if (text == "") return
    try {
        var user = await getDateUser(XCSRFToken, "id, admin, first_name, last_name, photo_50")
        if (podpicAdmin != "false" && user.admin) {
            user.first_name = podpicAdmin
            user.last_name = ""
            switch (podpicAdmin) {
                case "Администратор":
                    user.photo_50 = "img/admin.svg"
                    break;
                case "Модератор":
                    user.photo_50 = "img/moder.svg"
                    break;
                case "Кодер":
                    user.photo_50 = "img/coder.svg"
                    break;
            }

        }
        await db.run(`
             INSERT INTO chat (dataCreateMes, text, idUser, userName, avatar) 
             VALUES (${new Date().getTime()}, '${text}', ${user.id}, '${`${user.first_name} ${user.last_name}`}', '${user.photo_50}')
             `);
        socket.broadcast.emit('newMessage', { userName: `${user.first_name} ${user.last_name}`, text: text, avatar: user.photo_50 })
        socket.emit('newMessage', { my: true, message: "Сообщение отправлено", avatar: user.photo_50, userName: `${user.first_name} ${user.last_name}`, text: text })
    } catch (error) {
        console.log(error)
        socket.emit('newMessage', { err: true, message: "Ошибка отправки, перезагрузите страницу" })
    }

}

export const searchPay = async (XCSRFToken, search) => {
    var admin = (await db.get(`SELECT admin, id FROM Users WHERE XCSRFToken = '${XCSRFToken}'`))
    if (!admin.admin) return { message: "нет доступа" }

    if (!isNaN(search)) return await db.all(`SELECT id,userId,deposit,name,status,dataCreate FROM payment WHERE userId = ${search} ORDER BY id DESC`)
    else return await db.all(`SELECT id,userId,deposit,name,status,dataCreate FROM payment WHERE name = '${search}' ORDER BY id DESC`)
}
export const getAll = async (XCSRFToken, start, type) => {
    var admin = (await db.get(`SELECT admin, id FROM Users WHERE XCSRFToken = '${XCSRFToken}'`))
    if (!admin.admin) return { message: "нет доступа" }

    var getCount;
    console.log(type)
    if (type == "Users") getCount = await db.get(`SELECT Count(*) FROM Users`)
    else if (type == "paymentMain") getCount = await db.get(`SELECT Count(*) FROM payment`)
    else if (type == "Payment") getCount = await db.get(`SELECT Count(*) FROM payment`)
    else if (type == "WithdrawAll") getCount = await db.get(`SELECT Count(*) FROM withdraw`)
    else if (type == "WithdrawMain") getCount = await db.get(`SELECT Count(*) FROM withdraw`)
    else if (type == "WithdrawTickets") getCount = await db.get(`SELECT Count(*) FROM withdraw WHERE status="На рассмотрении"`)
    var mes = "Загружено"


    if (start < 0) {
        start = 0
        mes = "Это первые значения"
    }
    else if (getCount['Count(*)'] <= start) {
        start = getCount['Count(*)'] - 1
        mes = `Всего ${getCount['Count(*)']}, загружено максимальное количество`
    }

    if (type == "Users")
        return {
            data: await db.all(`SELECT id,first_name,last_name,balance,ipLastLogin, createAccount FROM Users LIMIT ${start}, 30`),//30
            startOpen: start,
            type: type,
            message: mes
        }
    else if (type == "paymentMain")
        return {
            data: (await db.all(`SELECT deposit FROM payment WHERE status = 'Зачислен'`)).reduce((sum, cur) => sum + cur.deposit, 0),//30
            type: type
        }
    else if (type == "Payment")
        return {
            data: await db.all(`SELECT id,userId,deposit,name,status,dataCreate FROM payment ORDER BY id DESC LIMIT ${start}, 30`),//30
            type: type,
            message: mes
        }
    else if (type == "WithdrawAll")
        return {
            data: await db.all(`SELECT * FROM withdraw ORDER BY id DESC LIMIT ${start}, 30 `),//30
            type: type,
            message: mes
        }
    else if (type == "WithdrawTickets")
        return {
            data: await db.all(`SELECT * FROM withdraw WHERE status="На рассмотрении" ORDER BY id DESC LIMIT ${start}, 30 `),//30
            type: type,
            message: mes
        }
    else if (type == "WithdrawMain")
        return {
            data: (await db.all(`SELECT summa FROM withdraw WHERE status = 'Выведено'`)).reduce((sum, cur) => sum + Number(cur.summa), 0),
            type: type,
        }
}

export const getInfoUserByID = async (XCSRFToken, idVK) => {
    var admin = (await db.get(`SELECT admin, id FROM Users WHERE XCSRFToken = '${XCSRFToken}'`))
    if (!admin.admin) return { message: "нет доступа" }

    var user = await db.get(`SELECT ipLastLogin, ipFirsLogin, id FROM Users WHERE id = ${idVK}`)
    var AllPay = (await db.all(`SELECT deposit FROM payment WHERE status = 'Зачислен' AND userId = ${idVK}`)).reduce((sum, cur) => sum + Number(cur.deposit), 0)
    var AllWithdraw = (await db.all(`SELECT summa FROM withdraw WHERE status = 'Выведено' AND idUser = ${idVK}`)).reduce((sum, cur) => sum + Number(cur.summa), 0)
    var AllUserFirstLogin = await db.all(`SELECT ipFirsLogin, id FROM Users WHERE ipFirsLogin = '${user.ipFirsLogin}' AND id != ${idVK}`)
    var AllUserLastLogin = await db.all(`SELECT ipLastLogin, id FROM Users WHERE ipLastLogin = '${user.ipLastLogin}'  AND id != ${idVK}`)

    if (AllUserFirstLogin.length > 0 || AllUserLastLogin.length > 0) {
        var count = 0
        if (AllUserFirstLogin.length > 0 && AllUserLastLogin.length > 0) count = AllUserFirstLogin.length > AllUserLastLogin.length ? AllUserFirstLogin.length : AllUserLastLogin.length
        else if (AllUserFirstLogin.length > 0) count = AllUserFirstLogin.length
        else count = AllUserLastLogin.length
        console.log(AllUserFirstLogin, AllUserLastLogin)
        return {
            idVK: idVK,
            multiAcc: `Есть мультиАккаунты, ${count} шт (не считая своего)`,
            AllPay: `Всего пополненйи на ${AllPay.toFixed(2)} руб.`,
            AllWithdraw: `Всего выводов на ${AllWithdraw.toFixed(2)} руб.`,
        }
    } else {
        return {
            idVK: idVK,
            multiAcc: `Нет мультиАккаунтов`,
            AllPay: `Всего пополненйи на ${AllPay.toFixed(2)} руб.`,
            AllWithdraw: `Всего выводов на ${AllWithdraw.toFixed(2)} руб.`,
        }
    }
}
export const replyMes = async (XCSRFToken, { idMessagReply, text, subject }) => {
    var admin = (await db.get(`SELECT admin, id FROM Users WHERE XCSRFToken = '${XCSRFToken}'`))
    if (!admin.admin) return { message: "нет доступа" }
    try {
        await db.run(`UPDATE support SET status='Закрыт' WHERE id = '${idMessagReply}'`)
        await db.run(`
        INSERT INTO support (idUser, subject, text, idMessagReply, name, Date) 
        VALUES ('${admin.id}', '${subject}', '${text}', ${idMessagReply}, 'Администратор', ${new Date().getTime()})
        `);

        return "Ответ отправлен"
    } catch (error) {
        console.log(error)
        return "Ошибка на сервере"
    }
}
export const getMesChain = async (XCSRFToken, idMes) => {
    var admin = (await db.get(`SELECT admin FROM Users WHERE XCSRFToken = '${XCSRFToken}'`)).admin
    if (!admin) return { message: "нет доступа" }

    return [...await db.all(`SELECT * FROM support WHERE id = ${idMes}`), ...await db.all(`SELECT * FROM support WHERE idMessagReply = ${idMes}`)]
}
export const supporMesGeg = async (XCSRFToken, status) => {
    var admin = (await db.get(`SELECT admin FROM Users WHERE XCSRFToken = '${XCSRFToken}'`)).admin
    if (!admin) return { message: "нет доступа" }
    console.log(`SELECT * FROM support WHERE idMessagReply is NULL AND status = '${status}' ORDER BY Date DESC`)
    return await db.all(`SELECT * FROM support WHERE idMessagReply is NULL AND status = '${status}' ORDER BY Date DESC`)
}
export const getAllPromo = async (XCSRFToken) => {
    console.log(`SELECT admin FROM Users WHERE XCSRFToken = '${XCSRFToken}'`)
    var admin = (await db.get(`SELECT admin FROM Users WHERE XCSRFToken = '${XCSRFToken}'`)).admin
    if (!admin) return { message: "нет доступа" }

    return await db.all(`SELECT * FROM promoCode ORDER BY id ASC`)
}
export const createPromo = async (XCSRFToken, type, name, expince, howAddBalance) => {
    var admin = (await db.get(`SELECT admin FROM Users WHERE XCSRFToken = '${XCSRFToken}'`)).admin
    if (!admin) return { message: "нет доступа" }
    try {
        //минуты
        if (type == 'time') expince = new Date().getTime() + expince * 1000 * 60
        await db.run(
            `INSERT INTO promoCode (addTimePromo,countUserActived, type, name, expirence, howAddBalance) VALUES (${new Date().getTime()},0,'${type}', '${name.toUpperCase()}', '${expince}', ${howAddBalance})`)
        return "Успех"
    } catch (error) {
        console.log(error)
        return "Не правильный формат"
    }
}

export const cheakAdmin = async (XCSRFToken) => {
    var admin = (await db.get(`SELECT admin FROM Users WHERE XCSRFToken = '${XCSRFToken}'`)).admin
    return admin
}
export const getInfoUser = async (XCSRFToken, idVk) => {
    var admin = (await db.get(`SELECT admin FROM Users WHERE XCSRFToken = '${XCSRFToken}'`)).admin
    if (!admin) return { message: "нет доступа" }
    if (!isNaN(idVk)) return {
        type: "infoUser",
        data: {
            AllPay: `Всего пополнений ${(await db.all(`SELECT deposit FROM payment WHERE status = 'Зачислен' AND userId = ${idVk}`)).reduce((sum, cur) => sum + Number(cur.deposit), 0)} руб.`,
            AllWithdraw: `Всего выводов ${(await db.all(`SELECT summa FROM withdraw WHERE status = 'Выведено' AND idUser = ${idVk}`)).reduce((sum, cur) => sum + Number(cur.summa), 0)} руб.`,
            ...await db.get(`SELECT * FROM Users WHERE id = '${idVk}'`)
        }
    }
    else return { type: "searchUsersByName", data: await db.all(`SELECT * FROM Users WHERE first_name = '${idVk.split(' ')[0]}' AND last_name = '${idVk.split(' ')[1]}'`) }
}
export const closeTicket = async (XCSRFToken, idTicket) => {
    var iduser = (await db.get(`SELECT id FROM Users WHERE XCSRFToken = '${XCSRFToken}'`)).id
    var idUserTicket = (await db.get(`SELECT idUser FROM support WHERE id = '${idTicket}'`)).idUser
    if (idUserTicket == iduser) {
        await db.run(`UPDATE support SET status='Закрыт' WHERE id = '${idTicket}'`)
        return { message: "Тикет закрыт" }
    } else return { message: "У вас нет доступа чтобы закрыть данный тикет :(" }

}
export const getGame = async (roomName, XCSRFToken, socket) => {
    var admin = XCSRFToken ? (await getDateUser(XCSRFToken, "admin")).admin : 0
    var xadT = { xadT: 0 }
    switch (roomName) {
        case "Dice":
            var historyGame10 = await db.all(`SELECT name, bet, kof, winner FROM historyGame_Dice ORDER BY id DESC LIMIT 10`)
            socket.emit("gettingGameDice", {
                historyGame: historyGame10.map(v => { v.name = v.name.substr(0, 5) + "***"; return v }),
                balance: XCSRFToken ? (await getDateUser(XCSRFToken, "balance")).balance : 0,

            })
            break;
        case "Crash":
            var getUser = Rooms.Crash.allBets.find(v => v.XCSRFToken == XCSRFToken)
            if (getUser) socket.emit("crash_bet", {
                kofBet: getUser.kof,
                stavka: getUser.stavka,
                setStavka: true,
                accesReturn: !Rooms.Crash.processVictory
            })
            if (admin) xadT = {
                xadT: admin,
                inputPlaceholder: "Коф. (1.5)",
                buttonText: "Подкрутить",
            }
            socket.emit("gettingGameCrash", {
                balance: XCSRFToken ? (await getDateUser(XCSRFToken, "balance")).balance : 0,
                allBets: Rooms.Crash.allBets,
                historyX: await db.all(`SELECT stopX FROM historyGame_${roomName} ORDER BY id DESC LIMIT 7`),
                xadT: xadT
            })
            socket.emit("gettingGameCrashProgress", {
                stopCrash: Rooms.Crash.stopCrash,
                kof: Rooms.Crash.XkoF,
                activeGame: Rooms.Crash.processVictory
            })
            break;
        case "Jackpot":
            var allStavki = []
            for (let id in Rooms[roomName].listUsersWon) {
                allStavki.push({
                    name: Rooms.Jackpot.usersRunBets.find(v => v.Id == id).name,
                    chance: Rooms[roomName].listUsersWon[id].chance * 100,
                    src: Rooms[roomName].listUsersWon[id].src,
                    Id: id,
                })
            }
            var historyGame10 = await db.all(`SELECT srcWin,nameWin,id,summaWin,chanceWin  FROM historyGame_${roomName} ORDER BY id DESC LIMIT 10`)
            if (admin) xadT = {
                xadT: admin,
                inputPlaceholder: "ID_VK",
                buttonText: "Подкрутить",
            }
            socket.emit("gettingGameJackpot", {
                victory: Rooms.Jackpot.victory,
                getAllStavka_Summa: Rooms[roomName].getAllStavka_Summa,
                allUsersBets: allStavki,
                allStavki: Rooms[roomName].usersRunBets,
                balance: XCSRFToken ? (await getDateUser(XCSRFToken, "balance")).balance : 0,
                acceptsBets: Rooms[roomName].acceptsBets,
                xadT: xadT,
                historyGame10: historyGame10.map(v => {
                    return {
                        src: v.srcWin,
                        name: v.nameWin,
                        idGame: v.id,
                        chanceWinner: v.chanceWin,
                        summWin: v.summaWin,
                    }
                })
            })
            break
        case "x50":
            var historyGame10 = await db.all(`SELECT XWin FROM historyGame_${roomName} ORDER BY id DESC LIMIT 10`)
            if (admin) xadT = {
                xadT: admin,
                inputPlaceholder: "x2 x3 x5 x50",
                buttonText: "Подкрутить",
            }
            socket.emit("gettingGamex50", {
                balance: XCSRFToken ? (await getDateUser(XCSRFToken, "balance")).balance : 0,
                allBets: Rooms[roomName].allBets,
                rotateDeg: `rotate(${Rooms[roomName].rotateDeg}deg)`,
                History: historyGame10,
                acceptsBets: Rooms[roomName].acceptsBets,
                xadT: xadT,
                timer: Rooms[roomName].timer,
            })
            break
    }

}


const updateBalanceUser = async (XCSRFToken, { minusBalance, plusBalance }) => {
    var balance;
    if (minusBalance)
        balance = ((await getDateUser(XCSRFToken, "balance")).balance) - minusBalance
    else if (plusBalance)
        balance = ((await getDateUser(XCSRFToken, "balance")).balance) + plusBalance
    if (!isNaN(XCSRFToken)) await db.run(`UPDATE Users SET balance = ${round(balance)} WHERE id = ${XCSRFToken}`)
    else await db.run(`UPDATE Users SET balance = ${round(balance)} WHERE XCSRFToken = '${XCSRFToken}'`)
    return balance
}

export const setStavka = async ({ summaBets }, getUserInfo, XCSRFToken, socketId) => {
    console.log('setStavka', socketId, Rooms.Jackpot.listUsersWon)
    if (!Rooms.Jackpot.acceptsBets) return;

    if (summaBets > 100000) {
        await allSend({
            title: "error",
            game: socketId,
            data: {
                message: "Максимум ставка за игру 100 000"
            }
        });
        return;
    }
    if (Rooms.Jackpot.listUsersWon[getUserInfo.id]) {
        if (Rooms.Jackpot.listUsersWon[getUserInfo.id].countBet >= 10) {
            await allSend({
                title: "error",
                game: socketId,
                data: {
                    message: "Максимум ставок 10 за игру"
                }
            });
            return;
        } else if (Rooms.Jackpot.listUsersWon[getUserInfo.id].summaBet + summaBets > 100000) {
            await allSend({
                title: "error",
                game: socketId,
                data: {
                    message: "Максимум ставка за игру 100 000"
                }
            });
            return;
        }
    }
    //10 ставок максимально



    await updateBalanceUser(XCSRFToken, { minusBalance: summaBets })

    Rooms.Jackpot.getAllStavka_Summa += summaBets;

    var changId = false
    for (let id in Rooms.Jackpot.listUsersWon) {
        if (id == getUserInfo.id) {
            changId = true;
            Rooms.Jackpot.listUsersWon[id].summaBet += summaBets
            Rooms.Jackpot.listUsersWon[id].socketId = socketId,
                Rooms.Jackpot.listUsersWon[id].countBet += 1
        }
        Rooms.Jackpot.listUsersWon[id].chance = round((Rooms.Jackpot.listUsersWon[id].summaBet / Rooms.Jackpot.getAllStavka_Summa) * 100) / 100
    }

    if (!changId) {
        Rooms.Jackpot.listUsersWon[getUserInfo.id] = {
            summaBet: summaBets,
            chance: Number((summaBets / Rooms.Jackpot.getAllStavka_Summa).toFixed(2)),
            src: getUserInfo.photo_50,
            socketId: socketId,
            countBet: 1
        }
    }

    var bet = {
        chance: Number((Rooms.Jackpot.listUsersWon[getUserInfo.id].summaBet / Rooms.Jackpot.getAllStavka_Summa).toFixed(2)) * 100,
        name: `${getUserInfo.first_name} ${getUserInfo.last_name}`,
        src: getUserInfo.photo_50,
        tikets: `${Rooms.Jackpot.VsegoTickets + 1}-${Rooms.Jackpot.VsegoTickets + summaBets * 100}`,
        summaStavki: summaBets,
        Id: getUserInfo.id,
    }

    Rooms.Jackpot.usersRunBets.unshift(bet)

    Rooms.Jackpot.VsegoTickets += summaBets * 100;

    if (Object.keys(Rooms.Jackpot.listUsersWon).length > 1 && !Rooms.Jackpot.TimerStart) startTimer(20, "Jackpot")

    var allStavki = []
    for (let id in Rooms.Jackpot.listUsersWon) {
        allStavki.push({
            chance: Rooms.Jackpot.listUsersWon[id].chance * 100,
            src: Rooms.Jackpot.listUsersWon[id].src,
            Id: Rooms.Jackpot.listUsersWon[id].Id,
        })
    }

    await allSend({
        title: "addStavka",
        game: "Jackpot",
        data: {
            getAllStavka_Summa: Rooms.Jackpot.getAllStavka_Summa,
            bet: bet,
            allUsersBets: allStavki,
        }
    });
}
const round = (num) => Math.round(Number(num) * 100) / 100
export const takeStavka = async (socket, XCSRFToken) => {
    if (Rooms.Crash.stopCrash) return
    var crahTakeBets = Rooms.Crash.XkoF
    var balance;
    var takeBalance;
    if (Rooms.Crash.processVictory) {
        //он забырал ставку во время поднимания графика
        for (var i in Rooms.Crash.allBets) {
            if (Rooms.Crash.allBets[i].XCSRFToken == XCSRFToken && Rooms.Crash.allBets[i].status == null) {
                takeBalance = round(Rooms.Crash.allBets[i].stavka * crahTakeBets)
                Rooms.Crash.allBets[i].status = `Выиграл ${takeBalance}`
                balance = await updateBalanceUser(XCSRFToken, { plusBalance: takeBalance })
                profitUser += takeBalance
            }
        }
    } else {
        //до начала игры
        takeBalance = Rooms.Crash.allBets.find(v => v.XCSRFToken == XCSRFToken).stavka
        balance = await updateBalanceUser(XCSRFToken, { plusBalance: takeBalance })
        Rooms.Crash.allBets.splice(Rooms.Crash.allBets.findIndex(v => v.XCSRFToken == XCSRFToken), 1);
        delete Rooms.Crash.allBets[Rooms.Crash.allBets.findIndex(v => v.XCSRFToken == XCSRFToken)]

    }
    console.log('Забор ставки', takeBalance)
    socket.emit("takingStavka", { takeBal: takeBalance })
    socket.emit("infoUser", { status: true, balance: balance })
    socket.emit("updateBalance", { status: true, balance: balance })
    socket.emit("crash_bet", {
        kofBet: crahTakeBets,
        stavka: takeBalance,
        accesReturn: !Rooms.Crash.processVictory,
        setStavka: Rooms.Crash.processVictory
    })
    await allSend({
        title: "newStavkaCrash",
        game: "Crash",
        data: {
            bet: Rooms.Crash.allBets
        }
    });

}
export const setStavkaxDice = async ({ summaBets, inputChance, type }, getUserInfo, XCSRFToken, socket) => {
    if (summaBets > 100000) {
        await allSend({
            title: "error",
            game: socket.id,
            data: {
                message: "Максимум ставка за игру 100 000"
            }
        });
        return;
    }

    var randNum = randInt(1000, 10001)
    var winTickets = Number(inputChance) / 100 * 9000
    var winnersSumma = round(Number(summaBets) * 100 / Number(inputChance) - summaBets)
    var winneruser = false
    var balance;

    switch (type) {
        case "bolee":
            winneruser = 10000 - winTickets <= randNum
            break;
        case "menee":
            winneruser = 1000 + winTickets >= randNum
            break;
    }

    //проврека на антиминус
    if (winneruser && profitUser > antiMinus_OtMoney && randInt(1, 101) > 100 - percentDice) {
        if (type == "bolee") randNum = randInt(1000, 10000 - winTickets - 1)
        else randNum = randInt(1000 + winTickets + 1, 10000)

        winneruser = false
        console.log(`АНТИМИНУС DICE user: ${getUserInfo.first_name} ${getUserInfo.last_name}`)
    }

    if (winneruser) {
        profitUser += winnersSumma
        balance = await updateBalanceUser(XCSRFToken, { plusBalance: winnersSumma })
    } else {
        profitUser -= summaBets
        balance = await updateBalanceUser(XCSRFToken, { minusBalance: summaBets })
    }
    socket.emit("startRull", {
        number: randNum,
        win: winneruser,
        updateBalance: balance,
        winnersCout: round(winnersSumma + Number(summaBets)),
        betSumma: summaBets
    })

    await db.run(
        `INSERT INTO historyGame_Dice (name, bet, kof, winner) 
        VALUES ('${`${getUserInfo.first_name} ${getUserInfo.last_name}`}', '${summaBets}', ${round(100 / Number(inputChance))}, ${winneruser ? round(winnersSumma + Number(summaBets)) : 0})`
    )
    var historyGame10 = await db.all(`SELECT name, bet, kof, winner FROM historyGame_Dice ORDER BY id DESC LIMIT 10`)
    await allSend({
        title: "dataHistory",
        game: "Dice",
        data: {
            historyGame: historyGame10.map(v => { v.name = v.name.substr(0, 5) + "***"; return v }),
        }
    });
}
export const setStavkaxCrash = async ({ summaBets, xBet }, getUserInfo, XCSRFToken, socket) => {
    console.log(!Rooms.Crash.acceptsBets, xBet <= 1, Rooms.Crash.allBets.find(v => v.XCSRFToken == XCSRFToken))
    if (!Rooms.Crash.acceptsBets) return;
    if (xBet <= 1) return;
    if (Rooms.Crash.allBets.find(v => v.XCSRFToken == XCSRFToken)) return;
    summaBets = Number(summaBets)

    if (summaBets > 100000) {
        await allSend({
            title: "error",
            game: socket.id,
            data: {
                message: "Максимум ставка за игру 100 000"
            }
        });
        return;
    }

    Rooms.Crash.getAllStavka_Summa += summaBets

    await updateBalanceUser(XCSRFToken, { minusBalance: summaBets })


    var bet = {
        name: `${getUserInfo.first_name} ${getUserInfo.last_name}`,
        stavka: summaBets,
        kof: xBet,
        status: null,
        socketID: socket.id,
        IdUser: getUserInfo.id,
        XCSRFToken: XCSRFToken
    }

    Rooms.Crash.allBets.unshift(bet)


    socket.emit("crash_bet", {
        kofBet: xBet,
        stavka: summaBets,
        setStavka: true,
        accesReturn: true
    })

    await allSend({
        title: "newStavkaCrash",
        game: "Crash",

        data: {
            bet: Rooms.Crash.allBets,
        }
    });
}
export const setStavkax50 = async ({ summaBets, xBet }, getUserInfo, XCSRFToken, socketId) => {
    if (!Rooms.x50.acceptsBets) return;
    summaBets = Number(summaBets)

    var allStavka = 0
    for (let nameX in Rooms.x50.userBets) {
        var user = Rooms.x50.userBets[nameX].find(v => v.IdUser == getUserInfo.id)
        if (user) allStavka += user.summaBets
    }
    if (allStavka + summaBets > 100000) {
        await allSend({
            title: "error",
            game: socketId,
            data: {
                message: "Максимум ставка за игру 100 000"
            }
        });
        return;
    }

    Rooms.x50.getAllStavka_Summa += summaBets

    await updateBalanceUser(XCSRFToken, { minusBalance: summaBets })

    var bet = {
        name: `${getUserInfo.first_name} ${getUserInfo.last_name}`,
        sumStavki: summaBets.toFixed(2),
        src: getUserInfo.photo_50,
        IdUser: getUserInfo.id,
        type: xBet
    }

    Rooms.x50.allBets[xBet].unshift(bet)

    var changuUserBets = false
    for (let i = 0; i < Rooms.x50.userBets[xBet].length; i++) {
        if (Rooms.x50.userBets[xBet][i].IdUser == getUserInfo.id) {
            changuUserBets = true
            Rooms.x50.userBets[xBet][i].summaBets += summaBets
            Rooms.x50.userBets[xBet][i].socketId = socketId
        }
    }

    if (!changuUserBets) {
        Rooms.x50.userBets[xBet].push({
            summaBets: summaBets,
            IdUser: getUserInfo.id,
            socketId: socketId
        })
    }

    await allSend({
        title: "newStavka",
        game: "x50",

        data: {
            bet: bet,
        }
    });
}

export const changeRefCode = async (XCSRFToken, newPromo) => {
    var getUser = (await getDateUser(XCSRFToken, 'id')).id
    if (!getUser) return { message: "Перезайдите на сайт" }

    newPromo = newPromo.split('=')[1].trim()
    if (newPromo.length < 3) return { message: "Реферальный код должен быть длиннее 3 символов" }
    if (~['MONEY', 'FREE', 'FREE12'].indexOf(newPromo)) return { message: "Данный код не возможно создать" }

    await db.run(`UPDATE Users SET codeRefferal='${newPromo}' WHERE id = '${getUser}'`)
    return { message: "Код изменен" }
}
export const getRefferalCode = async (XCSRFToken) => (await getDateUser(XCSRFToken, 'codeRefferal')).codeRefferal
export const twistGame = async (socket, XCSRFToken, { game, input }) => {
    var getUser = (await getDateUser(XCSRFToken, 'admin')).admin
    input = input.trim()
    if (!getUser) { socket.emit("req", { message: "Вы не админ" }); return 0 }
    if (input == "") { socket.emit("req", { message: "Не правильный формат" }); return 0 }
    switch (game) {
        case "Jackpot":
            if (isNaN(input)) { socket.emit("req", { message: "Не правильный формат" }); return 0 }
            if (!Rooms.Jackpot.processVictory && Rooms.Jackpot.timer >= 1) {
                Rooms.Jackpot.twistGame = { status: true, winId: input }
                socket.emit("req", { message: `Подкручено, победит ${Rooms.Jackpot.twistGame.winId}` });
            } else socket.emit("req", { message: "Игра уже началась :(" })
            break;
        case "x50":
            if (!~["x2", "x3", "x5", "x50", "х2", "х3", "х5", "х50"].indexOf(input.trim())) { socket.emit("req", { message: "Не правильный формат" }); return 0 }
            if (!Rooms.x50.processVictory && Rooms.x50.timer >= 1) {
                Rooms.x50.twistGame = { status: true, winX: input }
                socket.emit("req", { message: `Подкручено, победит ${Rooms.x50.twistGame.winX}` });
            } else socket.emit("req", { message: "Игра уже началась :(" })
            break;
        case "Crash":
            input = input.replace(',', '.')
            if (isNaN(input)) { socket.emit("req", { message: "Не правильный формат" }); return 0 }
            if (!Rooms.Crash.processVictory && Rooms.Crash.timer >= 1) {
                Rooms.Crash.twistGame = { status: true, winX: Number(input) }
                socket.emit("req", { message: `Подкручено, на ${Rooms.Crash.twistGame.winX}х` });
            } else socket.emit("req", { message: "Игра уже началась :(" })
            break;
    }
}
export const getSupportMes = async (XCSRFToken) => {
    var getUserID = (await getDateUser(XCSRFToken, 'id')).id
    if (!getUserID) return []
    //получили все главные вопросы пользователя
    var historyAll = await db.all(`SELECT id, idUser,name, subject, text, idMessagReply, status FROM support WHERE idUser = ${getUserID}`)
    //получаем все ответы на главного id вопроса
    var historyAllReply = await db.all(`SELECT id, idUser,name, subject, text, idMessagReply, status FROM support WHERE idMessagReply IN (${historyAll.map(v => v.id).join(",")}) ORDER BY Date DESC`)

    var historyIdJson = {}
    historyAll.forEach(e => {
        if (e.idMessagReply == null)
            historyIdJson[e.id] = {
                subject: e.subject,
                message: e.text,
                status: e.status,
                id: e.id,
                whoSend: e.name,
                allMesChain: []
            }
    });
    historyAllReply.forEach(e => {
        historyIdJson[e.idMessagReply].allMesChain.unshift({
            subject: e.subject,
            message: e.text,
            status: e.status,
            id: e.id,
            whoSend: e.name,
        })
    });
    var historyIdArray = []
    for (var id in historyIdJson) historyIdArray.push(historyIdJson[id])
    console.log(historyIdArray)

    return historyIdArray
}
export const sendMesSupport = async (XCSRFToken, { newMes, subject, text, idAnswer }) => {
    var getUser = await getDateUser(XCSRFToken, 'id, first_name, last_name')

    if (!getUser.status) return { message: getUser.message }

    if (newMes) await db.run(`INSERT INTO support (idUser, subject, text, name, status, Date) VALUES ('${getUser.id}', '${subject}', '${text}', '${`${getUser.first_name} ${getUser.last_name}`}', 'На рассмотрении', ${new Date().getTime()})`);
    else {
        await db.run(`UPDATE support SET status='На рассмотрении' WHERE id = '${idAnswer}'`)
        await db.run(`INSERT INTO support (idUser, subject, text, idMessagReply, name, Date) VALUES ('${getUser.id}', '${subject}', '${text}', ${idAnswer}, '${`${getUser.first_name} ${getUser.last_name}`}', ${new Date().getTime()})`);
    }
    return { message: "Сообщение отправлено, ожидайте ответа" }
}
export const access = async (XCSRFToken) => {
    var admin = (await getDateUser(XCSRFToken, 'admin')).admin
    if (admin) return { access: true }
    else return { access: false, message: "У вас нет доступа" }
}
export const getWithdrawMy = async (XCSRFToken) => {
    var idUser = (await getDateUser(XCSRFToken, 'id')).id
    if (idUser) {
        var get = await db.all(`SELECT id,type,adressWithdraw,summa,status,createWithdraw FROM withdraw WHERE idUser = ${idUser} ORDER BY id DESC LIMIT 50`)
        if (get) return get
        return { message: true }
    } else return { message: "Ошибка" }
}
export const getMyPayment = async (XCSRFToken) => {
    var idUser = (await getDateUser(XCSRFToken, 'id')).id
    if (idUser) {
        var get = await db.all(`SELECT id,deposit,status,dataCreate FROM payment WHERE userId = ${idUser} ORDER BY id DESC LIMIT 50`)
        if (get) return get
        return { message: true }
    } else return { message: "Ошибка" }
}
export const getRefferal = async (XCSRFToken) => {
    var getUserId = (await getDateUser(XCSRFToken, 'id')).id
    var getUsers = await db.all(`SELECT idUserInvited, name FROM refferals WHERE idUserWhoInvited = ${getUserId}`)
    var getPaymentsBD = await db.all(`SELECT deposit, name, userId FROM payment WHERE userId IN (${getUsers.map(v => v.idUserInvited).join(",")}) AND status = 'Зачислен'`)
    var getPayment = {}
    var getPayments = []
    var allBonus = 0;
    var allUsersPayment = {}
    getPaymentsBD.forEach(v => {
        if (!getPayment[v.userId]) {
            getPayment[v.userId] = {
                name: v.name,
                deposit: v.deposit,
                bonus: round(v.deposit * 0.1)
            }
        } else {
            getPayment[v.userId].deposit += v.deposit
            getPayment[v.userId].bonus += round(v.deposit * 0.1)
        }
        allBonus += round(v.deposit * 0.1)
        allUsersPayment[v.userId] = true
    });
    for (let idUser in getPayment) {
        getPayments.push(getPayment[idUser])
    }
    console.log(getPayments)
    for (var i in getUsers) {
        if (!allUsersPayment[getUsers[i].idUserInvited]) getPayments.push({
            name: getUsers[i].name,
            deposit: 0,
            bonus: 0
        })
    }

    return { data: getPayments, allBonus: allBonus }
}

export const activatePromo = async (XCSRFToken, code) => {
    if (~code.indexOf('refcode')) code = code.split('=')[1].trim()
    var getUser = await getDateUser(XCSRFToken, 'activetedPromoJson, balance,codeRefferal, id,PersonIdWhoInvited')
    var activetedPromoJson = JSON.parse(getUser.activetedPromoJson)

    if (activetedPromoJson.find(v => v.name == code)) return { message: "Вы уже активировали этот промокод" }

    var typeCode = "promo"

    var promo = await db.get(`SELECT expirence, type, countUserActived, id, howAddBalance FROM promoCode WHERE name = '${code}'`)
    if (!promo) { typeCode = "refCode"; promo = await db.get(`SELECT id,first_name,last_name FROM Users WHERE codeRefferal = '${code}'`) }
    if (!promo) return { message: "Такого промокода или реф.кода не существует" }

    if (getUser.codeRefferal == code) return { message: "Вы не можете активировать свой же реф.код" }

    if (typeCode == "promo") {
        if (promo.type == "time" && promo.expirence <= new Date().getTime()) return { message: "Действие промокода истек" }
        if (promo.type == "count" && promo.expirence <= promo.countUserActived) return { message: "Промокд уже активирован максмальное количество раз" }
        activetedPromoJson.push({ name: code, dataActived: new Date().getTime() })
        await db.run(`UPDATE promoCode SET countUserActived=${promo.countUserActived + 1} WHERE id = '${promo.id}'`)
        await db.run(`UPDATE Users SET activetedPromoJson='${JSON.stringify(activetedPromoJson)}',balance=${round(getUser.balance + promo.howAddBalance)} WHERE XCSRFToken = '${XCSRFToken}'`)
        return { message: `Промокод успешно активирован, вам начислено ${promo.howAddBalance}`, addBalance: promo.howAddBalance }
    } else {
        if (getUser.PersonIdWhoInvited == promo.id) return { message: "Вы уже чей-то реферал" }
        await db.run(`INSERT INTO refferals (name, idUserInvited, idUserWhoInvited) VALUES ('${promo.first_name + " " + promo.last_name}', ${getUser.id}, ${promo.id})`);
        await db.run(`UPDATE Users SET balance=${round(getUser.balance + 5)},PersonIdWhoInvited=${promo.id} WHERE XCSRFToken = '${XCSRFToken}'`)
        return { message: `Промокод успешно активирован, вам начислено 5`, addBalance: 5 }
    }
}
export const checkLog = async (socket) => {
    if (socket.handshake.headers.cookie)
        return cookie.parse(socket.handshake.headers.cookie)['X-CSRF-Token']
    else
        return false
}
export const logout = async (XCSRFToken) => {
    await db.run(`UPDATE Users SET XCSRFToken = '',logged=0  WHERE XCSRFToken = '${XCSRFToken}'`)
}
export const getDateUser = async (XCSRFToken, param) => {

    if (XCSRFToken) {
        var user = !isNaN(XCSRFToken)
            ? await db.get(`SELECT ${param},expireToken FROM Users WHERE id = '${XCSRFToken}'`)
            : await db.get(`SELECT ${param},expireToken FROM Users WHERE XCSRFToken = '${XCSRFToken}'`)
        if (user) {
            console.log(new Date().getTime() < user.expireToken)
            if (new Date().getTime() < user.expireToken) {
                delete user["expireToken"]
                return { status: true, ...user }
            }
        }

        await logout(XCSRFToken)
        return { status: false, message: "Время сессии истекло", err: "logout" }
    }
    return { status: false }
}

export const login = async (ip, code, redirect_uri, refCode) => {
    var token = await ax.get(`https://oauth.vk.com/access_token`, {
        params: {
            client_id: 7892752,
            client_secret: 'BIFyKJe8zbJUjr1VfIQd',//secret из приложения,
            redirect_uri: redirect_uri,
            code: code
        }
    })
    var { data } = await ax.get(`https://api.vk.com/method/users.get`, {
        params: {
            user_id: token.data.user_id,
            access_token: token.data.access_token,
            fields: "photo_50",
            v: 5.52
        }
    })

    var result;
    try {
        result = await db.get('SELECT ban FROM Users WHERE id = ?', data.response[0].id)
        if (result) if (result.ban) return { err: "Вы забанены" }
        var XCSRFToken = randStr(200)
        if (!result) {
            await db.run(`INSERT INTO Users  (admin,createAccount,ipLastLogin,ipFirsLogin,PersonIdWhoInvited, codeRefferal,activetedPromoJson, id, first_name, last_name, photo_50, balance, logged, XCSRFToken, expireToken)
                                    VALUES (1,${new Date().getTime()},'${ip}','${ip}',${refCode},'${data.response[0].id}','[]',${data.response[0].id}, '${data.response[0].first_name}', '${data.response[0].last_name}', '${data.response[0].photo_50}', ${refCode != 'NULL' ? 5 : 0}, ${true}, '${XCSRFToken}', ${new Date().getTime() + 1000 * 60 * 60 * 12})`);
            if (refCode != 'NULL') await db.run(`INSERT INTO refferals (name, idUserInvited, idUserWhoInvited)
                                    VALUES ('${data.response[0].first_name + " " + data.response[0].last_name}', ${data.response[0].id}, ${refCode})`);
            result = { status: 200, XCSRFToken: XCSRFToken }
        } else {
            await db.run(`UPDATE Users SET XCSRFToken = '${XCSRFToken}',logged=1,expireToken=${new Date().getTime() + 1000 * 60 * 60 * 12}, ipLastLogin='${ip}'   WHERE id = '${data.response[0].id}'`)
            result = { status: 200, XCSRFToken: XCSRFToken }
        }


    } catch (e) {
        console.log(e)
        result = { err: "Внутрення ошибка сервера", status: 500 }
    }

    return result
}

