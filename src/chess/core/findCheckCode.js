import * as R from 'ramda'
import { lazy } from '~/utils'
import getMovableAxis from './getMovableAxis'
import getNextMovable from './getNextMovable'
import { getSpecial, createTile, findCodeByTile } from '../helpers'

/**
 * @param  {String}   side
 * @param  {String}   checkBy
 * @param  {Array}    snapshot
 * @return {Function}
 */
function createReduceCb (side, snapshot, checkBy) {
  const parseTile = findCodeByTile(snapshot)

  /**
   * @callback
   * @param  {Object}  acc
   * @param  {String}  mt
   * @return {boolean}
   */
  return (acc, mt) => {
    const { piece: mtPiece, side: mtSide } = parseTile(mt)
    const isCheckTo = mtPiece === 'K' && side !== mtSide // King

    if (!isCheckTo) {
      return acc
    }

    return {
      checkBy,
      checkTo: mt
    }
  }
}

/**
 * Find check code
 * @param  {Function} getFlatArgs
 * @return {String}
 */
function findCheckCode (getFlatArgs) {
  const { turn, snapshot, side, piece, file, rank } = getFlatArgs()
  const tile = createTile(file, rank)
  const checkCode = `${side}${piece}${tile}`
  const reduceCb = createReduceCb(side, snapshot, checkCode)
  const initial = { side, tile }

  return R.compose(
    R.reduce(reduceCb, {}),
    getNextMovable('tiles'),
    lazy,
    R.assoc('special', getSpecial(piece) || []),
    R.assoc('movableAxis', getMovableAxis(tile, turn, piece)),
    R.assoc('timeline', [snapshot])
  )(initial)
}

export default findCheckCode