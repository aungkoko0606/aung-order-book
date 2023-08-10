const ccxt = require('ccxt')
const {
    fetchOrderBooks,
    getMidPrice,
} = require('./../services/exchange/ccxtExchangeProvider')

jest.mock('ccxt', () => {
    return {
        binance: jest.fn(() => ({
            fetchOrderBook: jest.fn(() => ({
                bids: [[10000, 1]],
                asks: [[10100, 1]],
            })),
            enableRateLimit: jest.fn(),
        })),
    }
})

describe('fetchOrderBooks function', () => {
    test('should calculate exchange mid-prices and average mid-price', async () => {
        const exchanges = ['binance']
        const result = await fetchOrderBooks(exchanges)

        expect(ccxt.binance).toHaveBeenCalled()

        const expectedMidPrice = (10000 + 10100) / 2
        expect(result).toEqual({
            'binance Mid-Price': expectedMidPrice,
            'Average Mid-Price': expectedMidPrice,
        })
    })
})

describe('getMidPrice function', () => {
    test('should calculate the correct mid-price', () => {
        const orderBook = {
            bids: [[10000, 1]],
            asks: [[10100, 1]],
        }
        const midPrice = getMidPrice(orderBook)
        expect(midPrice).toBe((10000 + 10100) / 2)
    })
})
