const app = require('./app')
const http = require('http')
const WebSocket = require('ws')
const ccxtExchangeProvider = require('./services/exchange/ccxtExchangeProvider')

const port = process.env.PORT || 3000
const server = http.createServer(app)

const wss = new WebSocket.Server({ noServer: true })

server.on('upgrade', (request, socket, head) => {
    if (request.url === '/ws/binance') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request)
        })
    } else {
        socket.destroy()
    }
})

wss.on('connection', (ws) => {
    console.log('WebSocket connected')
    ccxtExchangeProvider.pollingBinanceMidPrice(ws)

    // Handle WebSocket disconnections
    ws.on('close', () => {
        console.log('WebSocket disconnected')
    })
})

server.listen(port, () => {
    console.log(`App runnning on port ${port}`)
})
