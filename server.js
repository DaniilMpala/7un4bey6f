import { login, cheakAdmin, getDateUser, searchPay, deletePromo, getWithdrawMy, changeRefCode, seccessWithdraw, cancelWithdraw, getMyPayment, getAll, withdraw, sendMes, createPay, gettingAllMessage, ioSet, supporMesGeg, replyMes, getMesChain, getAllPromo, access, updateUser, createPromo, getInfoUserByID, getInfoUser, twistGame, closeTicket, logout, checkLog, setStavka, getRefferal, getSupportMes, sendMesSupport, getGame, setStavkax50, setStavkaxCrash, takeStavka, activatePromo, setStavkaxDice, getRefferalCode, getRoomsInfo } from './functional.js'
import cluster from 'cluster'
import { Server } from 'socket.io'
import exp from 'express'
import http from 'http'
import os from 'os'
import cookie from 'cookie'
import path from 'path'
import compression from 'compression'
import helmet from 'helmet'
import rateLimit from "express-rate-limit"

// import { memoryUsage } from 'process';
// import { YMAuth } from "yoomoney-sdk";
// const api = new YMAuth("187E34D0F795582C9885971894AA0414D6B27D4991E66F5648E378DB41972CA1", "http://185.244.173.185/auth");
var cpuCount = os.cpus().length;
var workers = [];
var io;
var tempIp = {} //сохраняет ip и реф код\

var redirictMain = "/" // "http://localhost:3000"
var vkLogin = "http://185.244.173.185" // "http://localhost:1332"

if (cluster.isMaster) {
    for (var i = 0; i < cpuCount; i += 1) {
        var worker = cluster.fork();
        worker.on('message', function (data) {
            for (var j in workers) { workers[j].send(data); }
        });
        workers.push(worker);
    }
}


if (cluster.isWorker) {
    var worker_id = cluster.worker.id;
    // setInterval(() => {
    //     console.log(memoryUsage().heapTotal / 1000 / 1000, cluster.worker.id);
    // }, 1000);
    if (worker_id == 1) {

        var app = exp();
        var server = http.Server(app);
        io = new Server(server);
        server.listen(3030 + worker_id);
        console.log(3030 + worker_id)
        io.on('connection', async function (socket) {
            console.log(`Socket.id: ${socket.id}, WORKER ID : ${worker_id}`);
            ioSet(io)
            socket['roomTitle'] = ""

            socket.emit('infoUser', await getDateUser((await checkLog(socket) ? await checkLog(socket) : ""), "photo_50, balance,admin"))
            socket.emit('roomsInfo', await getRoomsInfo())
            socket.emit('gettingAllMessage', await gettingAllMessage(await checkLog(socket)))

            //прием сообщений от сокета
            socket.on('disconnect', async function () {
                ioSet(io)
            })
            socket.on('sendMes', async function ({ text, podpicAdmin }) {
                if (await checkLog(socket)) sendMes(socket, await checkLog(socket), text, podpicAdmin)
            })
            socket.on('joinRoom', async function (titleRoom) {
                console.log(1, socket.roomTitle, titleRoom)
                socket.leave(socket.roomTitle)
                socket.join(titleRoom);

                socket.roomTitle = titleRoom

                console.log(titleRoom)

                getGame(titleRoom, await checkLog(socket), socket)

                console.log(socket.id, titleRoom)
            });
            socket.on('takeStavka', async function () {
                
            });
            socket.on('req', async function (info) {
                
            });
            socket.on('setStavka', async function (data) {
                
            });
        });

    } else {
        var app_express = exp();

        app_express.use(exp.json());
        app_express.use(compression())
        app_express.use(exp.urlencoded({ extended: true }));

        app_express.use(helmet());
        app_express.use(helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net/", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                frameSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "'unsafe-inline'", "data:", "https://cdn.jsdelivr.net", "*.userapi.com"],
                fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com/", "data:"],
            }
        }));

        // app_express.use(function (req, res, next) {
        //     res.removeHeader("X-Powered-By");
        //     next();
        //   });
        const apiLimiter = rateLimit({
            windowMs: 5 * 1000,
            max: 150
        });

        app_express.use(apiLimiter);
        app_express.listen(1330 + worker_id);
        console.log(1330 + worker_id)
        app_express.use('/', exp.static('./build'));
        app_express.get('*', (req, res, next) => ~['/login', '/logOut'].indexOf(req.path) || ~req.path.indexOf('auth') ? next() : res.sendFile(path.resolve('./build/index.html'), function (err) {
            if (err) {
                console.log(err)
            }
        }));

        app_express.post('/getRefferalCode', async (req, res) => {
            if (req.headers.cookie) res.json(await getRefferalCode(cookie.parse(req.headers.cookie)['X-CSRF-Token']))
        })
        app_express.post('/getMyPayment', async (req, res) => {
            if (req.headers.cookie) res.json(await getMyPayment(cookie.parse(req.headers.cookie)['X-CSRF-Token']))
        })
        app_express.post('/activatePromo', async (req, res) => {
            console.log(worker_id)
            if (req.headers.cookie) res.json(await activatePromo(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body.promo.toUpperCase()))
        })
        app_express.post('/getRefferal', async (req, res) => {
            if (req.headers.cookie) res.json(await getRefferal(cookie.parse(req.headers.cookie)['X-CSRF-Token']))
        })
        app_express.post('/access', async (req, res) => {
            if (req.headers.cookie) res.json(await access(cookie.parse(req.headers.cookie)['X-CSRF-Token']))
        })
        app_express.post('/getInfoUser', async (req, res) => {
            if (req.headers.cookie) res.json(await getInfoUser(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body.idVk))
        })
        app_express.post('/getInfoUserByID', async (req, res) => {
            if (req.headers.cookie) res.json(await getInfoUserByID(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body.id))
        })
        app_express.post('/supporMesGeg', async (req, res) => {
            if (req.headers.cookie) res.json(await supporMesGeg(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body.status))
        })
        app_express.post('/updateUser', async (req, res) => {
            if (req.headers.cookie) res.json(await updateUser(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body.teg, req.body.val, req.body.id))
        })
        app_express.post('/createPromo', async (req, res) => {
            if (req.headers.cookie) res.json(await createPromo(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body.type, req.body.name.toUpperCase(), req.body.expince, req.body.howAddBalance))
        })
        app_express.post('/closeTicket', async (req, res) => {
            if (req.headers.cookie) res.json(await closeTicket(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body.idClose))
        })
        app_express.post('/getAllPromo', async (req, res) => {
            if (req.headers.cookie) res.json(await getAllPromo(cookie.parse(req.headers.cookie)['X-CSRF-Token']))
        })
        app_express.post('/sendMesSupport', async (req, res) => {
            if (req.headers.cookie) res.json(await sendMesSupport(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body))
        })
        app_express.post('/replyMes', async (req, res) => {
            if (req.headers.cookie) res.json(await replyMes(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body))
        })
        app_express.post('/getMesChain', async (req, res) => {
            if (req.headers.cookie) res.json(await getMesChain(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body.idMes))
        })
        app_express.post('/getSupportMes', async (req, res) => {
            if (req.headers.cookie) res.json(await getSupportMes(cookie.parse(req.headers.cookie)['X-CSRF-Token']))
        })
        app_express.post('/payment', async (req, res) => {
            if (req.headers.cookie) res.json(await createPay(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body.summa, req.body.type))
        })
        app_express.post('/getAll', async (req, res) => {
            if (req.headers.cookie) res.json(await getAll(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body.start, req.body.type))
        })
        app_express.post('/getPayment', async (req, res) => {
            if (req.headers.cookie) res.json(await getPayment(cookie.parse(req.headers.cookie)['X-CSRF-Token']))
        })
        app_express.post('/withdraw', async (req, res) => {
            if (req.headers.cookie) res.json(await withdraw(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body))
        })
        app_express.post('/seccessWithdraw', async (req, res) => {
            if (req.headers.cookie) res.json(await seccessWithdraw(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body.id))
        })
        app_express.post('/cancelWithdraw', async (req, res) => {
            if (req.headers.cookie) res.json(await cancelWithdraw(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body.id))
        })
        app_express.post('/getWithdrawMy', async (req, res) => {
            if (req.headers.cookie) res.json(await getWithdrawMy(cookie.parse(req.headers.cookie)['X-CSRF-Token']))
        })
        app_express.post('/changeRefCode', async (req, res) => {
            if (req.headers.cookie) res.json(await changeRefCode(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body.newPromo.toUpperCase()))
        })
        app_express.post('/searchPay', async (req, res) => {
            if (req.headers.cookie) res.json(await searchPay(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body.search))
        })
        app_express.post('/deletePromo', async (req, res) => {
            if (req.headers.cookie) res.json(await deletePromo(cookie.parse(req.headers.cookie)['X-CSRF-Token'], req.body.idPromo))
        })
        // app_express.get('/checkPay/:id', async (req, res) => {
        //     console.log(req.params.id)
        // })auth
        // app_express.get('/auth', async (req, res, next) => {
        //     console.log('1111')
        //     if (req.headers.cookie)
        //         if (await cheakAdmin(cookie.parse(req.headers.cookie)['X-CSRF-Token'])) {
        //             console.log('auth', req.query)
        //             if (!req.query.code) {
        //                 res.send(api.getAuthForm(["account-info", "incoming-transfers", "operation-details", "payment-p2p"]).replace("</form>", '<input type="submit" value="Регистрация приложения с новом client_id"></form>'))
        //             } else {
        //                 console.log(await api.exchangeCode2Token(req.query.code))
        //                 res.redirect("Ключ доступа: ",redirictMain)
        //             }
        //         }
        //     res.redirect(redirictMain)
        // })

        app_express.get('/login', async (req, res) => {
            console.log(tempIp)
            if (!req.query.code) {
                if (req.query.refcode) {
                    tempIp[req.headers['x-forwarded-for']] = req.query.refcode
                    process.send(tempIp)
                }
                console.log(tempIp);
                res.redirect(`https://oauth.vk.com/authorize?client_id=7892752&redirect_uri=${vkLogin}/login&response_type=code`);
            } else {
                console.log(tempIp[req.headers['x-forwarded-for']], req.headers)
                var log = await login(req.headers['x-forwarded-for'], req.query.code, `${req.protocol}://${req.get('host')}/login`, tempIp[req.headers['x-forwarded-for']] ? tempIp[req.headers['x-forwarded-for']] : 'NULL')
                delete tempIp[req.headers['x-forwarded-for']]
                process.send(tempIp)
                if (!log.err) {
                    res.cookie('X-CSRF-Token', log.XCSRFToken, { maxAge: 1000 * 60 * 60 * 12, httpOnly: true });
                    res.cookie('Auth', true, { maxAge: 1000 * 60 * 60 * 12 });
                    res.redirect(redirictMain)
                } else {
                    res.status(401).send(log.err)
                }

            }
        });
        app_express.get('/logOut', async (req, res) => {
            await logout(cookie.parse(req.headers.cookie)['X-CSRF-Token'])
            res.cookie('X-CSRF-Token', "", { maxAge: 1000, httpOnly: true });
            res.cookie('Auth', false, { maxAge: 1000 });
            res.redirect(redirictMain)
        });
        process.on('message', async (data) => {
            tempIp = data
        });
    }

}