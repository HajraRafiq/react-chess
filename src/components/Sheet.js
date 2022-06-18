import { memo } from 'react';
import PropTypes from 'prop-types';
import { reverse } from 'ramda';
import equal from 'fast-deep-equal/es6/react';
import { FlexRow, Text, Sticky } from 'ui/es';
import Box from 'ui-box';
import Notation from './internal/Notation';

const Sheet = ({ data }) => {
  return (
    <>
      <Sticky borderBottom="1px solid #cacaca" backgroundColor="#fff">
        <FlexRow justifyContent="space-between">
          {['White', 'Black'].map((side) => {
            return (
              <Box
                key={side}
                flex="1"
                textAlign="center"
                backgroundColor={side === 'White' ? '#fff' : '#000'}
                color={side === 'White' ? '#000' : '#fff'}
                padding={5}
              >
                <Text fontWeight="bold">{side}</Text>
              </Box>
            );
          })}
        </FlexRow>
      </Sticky>

      <Box>
        {reverse(data).map(({ white, black }, idx) => {
          return (
            <FlexRow
              key={idx}
              justifyContent="space-between"
              borderBottom="1px solid #cacaca"
            >
              <Notation sideData={white} />
              <Notation sideData={black} backgroundColor="#000" color="#fff" />
            </FlexRow>
          );
        })}
      </Box>
    </>
  );
};

Sheet.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      white: PropTypes.shape({
        from: PropTypes.arrayOf(PropTypes.string),
        to: PropTypes.arrayOf(PropTypes.string),
        check: PropTypes.shape({
          attackerCode: PropTypes.string,
          defenders: PropTypes.arrayOf(PropTypes.string),
          defendTiles: PropTypes.arrayOf(PropTypes.string),
          dodgeableTiles: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
      black: PropTypes.shape({
        from: PropTypes.arrayOf(PropTypes.string),
        to: PropTypes.arrayOf(PropTypes.string),
        check: PropTypes.shape({
          attackerCode: PropTypes.string,
          defenders: PropTypes.arrayOf(PropTypes.string),
          defendTiles: PropTypes.arrayOf(PropTypes.string),
          dodgeableTiles: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
    })
  ),
};

Sheet.defaultProps = {
  data: [],
};

export default memo(Sheet, equal);
