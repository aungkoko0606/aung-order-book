const ccxt = require('ccxt')

const symbol = 'BTC/USDT'
let exchangeMidPrice = {}

/**
 * Fetches order books from multiple exchanges and calculates mid-prices.
 * @param {Array} exchanges - An array of exchange names.
 * @returns {Object} - An object containing exchange mid-prices and average mid-price.
 */
exports.fetchOrderBooks = async (exchanges) => {
    const totalExchanges = exchanges.length
    let totalMidPrice = 0

    for (const exchangeName of exchanges) {
        try {
            const exchange = new ccxt[exchangeName]()
            exchange.enableRateLimit = true

            const orderBook = await exchange.fetchOrderBook(symbol)
            const midPrice = getMidPrice(orderBook)
            exchangeMidPrice[`${exchangeName} Mid-Price`] = midPrice
            totalMidPrice += midPrice
        } catch (error) {
            console.error(
                `Error fetching order book for ${exchangeName}: ${error.message}`
            )
        }
    }

    const totalExchangesAverageMidPrice = totalMidPrice / totalExchanges
    exchangeMidPrice['Average Mid-Price'] = totalExchangesAverageMidPrice

    return exchangeMidPrice
}

/**
 * Fetches order book from binance and calculates mid-price. And polling in websocket connection
 */
exports.pollingBinanceMidPrice = async (ws) => {
    try {
        const exchange = new ccxt['binance']()
        exchange.enableRateLimit = false
        const initialOrderBook = await exchange.fetchOrderBook(symbol)

        // Fetch updates every 10 seconds
        setInterval(async () => {
            try {
                const updatedOrderBook = await exchange.fetchOrderBook(symbol)
                const midPrice = getMidPrice(updatedOrderBook)
                ws.send(
                    JSON.stringify({
                        exchange: 'binance',
                        'Mid-Price': midPrice,
                    })
                )
            } catch (error) {
                console.error(`Error fetching order book from binance:`, error)
            }
        }, 10000)

        const initialMidPrice = getMidPrice(initialOrderBook)
        ws.send(
            JSON.stringify({
                exchange: 'binance',
                'Mid-Price': initialMidPrice,
            })
        )
    } catch (error) {
        console.error(`Error connecting to binance:`, error)
    }
}

/**
 * Calculates the mid-price from an order book.
 * @param {Object} orderBook - The order book object.
 * @returns {number} - The calculated mid-price.
 */
const getMidPrice = (orderBook) => {
    const highestBid = orderBook.bids[0][0]
    const lowestAsk = orderBook.asks[0][0]

    return (highestBid + lowestAsk) / 2
}

// For unit test
exports.getMidPrice = getMidPrice
