import { isEmpty } from 'ramda';
import { Side, createTimeline, AI, StateBuilder } from 'chess/es';

self.onmessage = ({ data }) => {
  const {
    present: { checkData },
    depth = 2,
    present,
    past,
  } = data;
  const iV = StateBuilder.createInitialV({
    timeline: createTimeline(present, past),
    side: Side[present.turn],
    ...checkData,
  });
  const codeList = AI.createList(iV.side, iV.snapshot);
  let bestMove = -9999;
  let bestState = null;

  console.time('worker');
  const stateList = [];

  for (let i = 0, len = codeList.length; i < len; i++) {
    const generatedStates = StateBuilder.of(iV).build(codeList[i]);

    if (!isEmpty(generatedStates)) {
      stateList.push(...generatedStates);
    }
  }

  for (let i = 0, len = stateList.length; i < len; i++) {
    const generatedState = stateList[i];
    const score = AI.minimax(generatedState, depth - 1, -10000, 10000, false);

    if (score >= bestMove) {
      bestMove = score;
      bestState = generatedState;
    }
  }
  console.timeEnd('worker');

  console.log(bestMove, bestState.node);
  self.postMessage({
    bestState,
  });
};
