'use strict'

const SYNC_API_METHODS = require('../../schema/sync.api.methods')
const {
  addPropsToResIfExist,
  getFlagsFromLedgerDescription,
  getCategoryFromDescription
} = require('./helpers')

const { decorateInjectable } = require('../../../di/utils')

const depsTypes = (TYPES) => [
  TYPES.SearchClosePriceAndSumAmount
]
class ApiMiddlewareHandlerAfter {
  constructor (
    searchClosePriceAndSumAmount
  ) {
    this.searchClosePriceAndSumAmount = searchClosePriceAndSumAmount
  }

  async [SYNC_API_METHODS.POSITIONS_HISTORY] (
    args,
    apiRes,
    isCheckCall
  ) {
    if (isCheckCall) {
      return apiRes
    }

    const res = []

    for (const position of apiRes.res) {
      const {
        basePrice,
        symbol,
        mtsUpdate: end,
        id
      } = { ...position }

      if (
        !symbol ||
        typeof symbol !== 'string' ||
        /tBFX/gi.test(symbol) ||
        !Number.isInteger(end) ||
        !Number.isInteger(id) ||
        !Number.isFinite(basePrice)
      ) {
        res.push({
          ...position,
          closePrice: null
        })

        continue
      }

      const {
        closePrice,
        sumAmount
      } = await this.searchClosePriceAndSumAmount({
        args,
        symbol,
        end,
        id
      })

      if (
        !Number.isFinite(closePrice) ||
        !Number.isFinite(sumAmount)
      ) {
        res.push({
          ...position,
          closePrice,
          pl: null,
          plPerc: null
        })

        continue
      }

      const pl = (closePrice - basePrice) * Math.abs(sumAmount)
      const plPerc = ((closePrice / basePrice) - 1) * 100

      res.push({
        ...position,
        closePrice,
        pl,
        plPerc
      })
    }

    return {
      ...apiRes,
      res
    }
  }

  [SYNC_API_METHODS.PUBLIC_TRADES] (args, apiRes) {
    return addPropsToResIfExist(
      args,
      apiRes,
      [{ from: 'symbol', to: '_symbol' }]
    )
  }

  [SYNC_API_METHODS.LEDGERS] (args, apiRes) {
    const res = apiRes.res.map(item => {
      const { balance } = { ...item }

      return {
        ...item,
        ...getFlagsFromLedgerDescription(
          item,
          [
            {
              fieldName: '_isMarginFundingPayment',
              pattern: 'Margin Funding Payment'
            },
            {
              fieldName: '_isAffiliateRebate',
              pattern: 'Affiliate Rebate'
            },
            {
              fieldName: '_isStakingPayments',
              pattern: 'Staking Payments'
            },
            {
              fieldName: '_category',
              handler: getCategoryFromDescription
            }
          ]
        ),
        _nativeBalance: balance
      }
    })

    return {
      ...apiRes,
      res
    }
  }

  [SYNC_API_METHODS.CANDLES] (args, apiRes) {
    return addPropsToResIfExist(
      args,
      apiRes,
      [
        { from: 'symbol', to: '_symbol' },
        { from: 'timeframe', to: '_timeframe' }
      ]
    )
  }

  [SYNC_API_METHODS.STATUS_MESSAGES] (args, apiRes) {
    return addPropsToResIfExist(
      args,
      apiRes,
      [{ from: 'type', to: '_type' }]
    )
  }

  [SYNC_API_METHODS.MAP_SYMBOLS] (args, apiRes) {
    return apiRes.reduce((accum, item) => {
      if (
        !Array.isArray(item) ||
        item.length < 2
      ) {
        return accum
      }

      const [key, value] = item
      accum.push({ key, value })

      return accum
    }, [])
  }
}

decorateInjectable(ApiMiddlewareHandlerAfter, depsTypes)

module.exports = ApiMiddlewareHandlerAfter
