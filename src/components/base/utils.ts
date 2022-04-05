import {TextStyle, ViewStyle} from 'react-native';

type PrependNextNum<A extends Array<unknown>> = A['length'] extends infer T
  ? ((t: T, ...a: A) => void) extends (...x: infer X) => void
    ? X
    : never
  : never;

type EnumerateInternal<A extends Array<unknown>, N extends number> = {
  0: A;
  1: EnumerateInternal<PrependNextNum<A>, N>;
}[N extends A['length'] ? 0 : 1];

export type Enumerate<N extends number> = EnumerateInternal<
  [],
  N
> extends (infer E)[]
  ? E
  : never;

export type Range<FROM extends number, TO extends number> = Exclude<
  Enumerate<TO>,
  Enumerate<FROM>
>;

export type Layout = string | number | number[];
type ActualLayoutConfig = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};
const convertLayoutConfig = (config: Layout): ActualLayoutConfig => {
  const distances: ActualLayoutConfig = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };

  const actualValues: number[] = [];
  if (typeof config === 'string') {
    actualValues.push(...config.split(' ').map((c) => +c));
  } else if (Array.isArray(config)) {
    actualValues.push(...config);
  } else if (typeof config === 'number') {
    actualValues.push(config);
  }
  const len = actualValues.length;
  switch (len) {
    case 1: {
      const distance = actualValues[0];
      distances.left = distance;
      distances.right = distance;
      distances.top = distance;
      distances.bottom = distance;
      break;
    }
    case 2: {
      const verticalDistance = actualValues[0];
      const horizontalDistance = actualValues[1];
      distances.left = horizontalDistance;
      distances.right = horizontalDistance;
      distances.top = verticalDistance;
      distances.bottom = verticalDistance;
      break;
    }
    case 4: {
      distances.top = actualValues[0];
      distances.right = actualValues[1];
      distances.bottom = actualValues[2];
      distances.left = actualValues[3];
      break;
    }
  }
  return distances;
};
export const convertPaddingMarginProp = (
  padding: Layout,
  margin: Layout,
): ViewStyle | TextStyle => {
  const style: ViewStyle | TextStyle = {};
  const paddingDistance = convertLayoutConfig(padding);
  style.paddingTop = paddingDistance.top;
  style.paddingBottom = paddingDistance.bottom;
  style.paddingLeft = paddingDistance.left;
  style.paddingRight = paddingDistance.right;
  const marginDistance = convertLayoutConfig(margin);
  style.marginTop = marginDistance.top;
  style.marginBottom = marginDistance.bottom;
  style.marginLeft = marginDistance.left;
  style.marginRight = marginDistance.right;
  return style;
};

export type DateTime = {
  id?: string;
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  second: number;
};
export const compareDateTime = (d1: DateTime, d2: DateTime): number => {
  const numD1 = d1.year * 10000 + d1.month * 100 + d1.day;
  const numD2 = d2.year * 10000 + d2.month * 100 + d2.day;
  return numD1 - numD2;
};

export const checkIfDateIsInRange = (
  start: DateTime | undefined,
  end: DateTime | undefined,
  date: DateTime,
): boolean => {
  const isBeforeStartDate = start ? compareDateTime(start, date) > 0 : false;
  const isAfterEndDate = end ? compareDateTime(date, end) > 0 : false;
  return isBeforeStartDate || isAfterEndDate;
};
