import { PointEstimate } from 'src/api/response/typings';

export const pointEstimateToNumber = (estimate: PointEstimate): number => {
  const estimateMap: { [key: string]: number } = {
    EIGHT: 8,
    FOUR: 4,
    ONE: 1,
    TWO: 2,
    ZERO: 0,
  };
  return estimateMap[estimate];
};
