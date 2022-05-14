import { compose, curry, reduce, keys, values, map, flatten } from 'ramda';
import removeBlockedTiles from './internal/removeBlockedTiles';
import groupDirectionTilesByCode from './internal/groupDirectionTilesByCode';
import { validateCode, validateSnapshot } from '../utils';

/**
 * Compute generic movable tiles (it remove blocked tiles also)
 * @param  {Array}  snapshot
 * @param  {String} code
 * @return {Array}
 */
function computeMTByDirection(snapshot, code) {
  if (!validateCode(code) || !validateSnapshot(snapshot)) {
    throw new TypeError(
      `invalid argument | code: ${code} / snapshot: ${snapshot}`
    );
  }

  // generic direction group (tiles)
  const tilesGrp = groupDirectionTilesByCode(code);

  return compose(
    flatten,
    values,
    reduce((acc, key) => {
      return {
        ...acc,
        [key]: compose(
          map(removeBlockedTiles(snapshot)),
          values
        )(tilesGrp[key]),
      };
    }, {}),
    keys
  )(tilesGrp);
}

export default curry(computeMTByDirection);