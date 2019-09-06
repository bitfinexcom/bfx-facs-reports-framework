'use strict'

const _getConvSchema = (ALLOWED_COLLS) => {
  return new Map([
    [
      ALLOWED_COLLS.LEDGERS,
      {
        symbolFieldName: 'currency',
        dateFieldName: 'mts',
        convFields: [
          { inputField: 'amount', outputField: 'amountUsd' },
          { inputField: 'balance', outputField: 'balanceUsd' }
        ]
      }
    ],
    [
      ALLOWED_COLLS.MOVEMENTS,
      {
        symbolFieldName: 'currency',
        dateFieldName: 'mtsUpdated',
        convFields: [
          { inputField: 'amount', outputField: 'amountUsd' }
        ]
      }
    ]
  ])
}

module.exports = (
  dao,
  currencyConverter,
  ALLOWED_COLLS,
  convertTo,
  syncColls
) => async () => {
  if (syncColls.every(name => (
    name !== ALLOWED_COLLS.ALL &&
    name !== ALLOWED_COLLS.CANDLES
  ))) {
    return
  }

  const convSchema = _getConvSchema(ALLOWED_COLLS)

  for (const [collName, schema] of convSchema) {
    let count = 0
    let _id = 0

    while (true) {
      count += 1

      if (count > 100) break

      const elems = await dao.getElemsInCollBy(
        collName,
        {
          filter: {
            $gt: { _id },
            $isNull: schema.convFields.map(obj => obj.outputField)
          },
          sort: [['_id', 1]],
          limit: 10000
        }
      )

      if (!Array.isArray(elems) || elems.length === 0) {
        break
      }

      const convElems = await currencyConverter
        .convertByCandles(
          elems,
          {
            convertTo,
            ...schema
          }
        )

      await dao.updateElemsInCollBy(
        collName,
        convElems,
        ['_id'],
        schema.convFields.map(({ outputField }) => outputField)
      )

      _id = elems[elems.length - 1]._id
    }
  }
}
