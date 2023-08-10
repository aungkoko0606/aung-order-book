const ccxtExchangeProvider = require('./../services/exchange/ccxtExchangeProvider')

exports.getAverageMidPrice = async (req, res) => {
    try {
        const exchanges = ['binance', 'kraken', 'huobi']
        const averageMidPrice = await ccxtExchangeProvider.fetchOrderBooks(
            exchanges
        )

        res.status(200).json({
            status: 'success',
            data: averageMidPrice,
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Internal Server Error',
        })
    }
}
