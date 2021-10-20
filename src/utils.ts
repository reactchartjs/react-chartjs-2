import type { ForwardedRef } from 'react';
import type {
  ChartType,
  ChartData,
  DefaultDataPoint,
  ChartDataset,
} from 'chart.js';

export function reforwardRef<T>(ref: ForwardedRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export function setNextDatasets<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(
  currentData: ChartData<TType, TData, TLabel>,
  nextDatasets: ChartDataset<TType, TData>[]
) {
  currentData.datasets = nextDatasets.map(nextDataset => {
    // given the new set, find it's current match
    const currentDataset = currentData.datasets.find(
      dataset =>
        dataset.label === nextDataset.label && dataset.type === nextDataset.type
    );

    // There is no original to update, so simply add new one
    if (!currentDataset || !nextDataset.data) return nextDataset;

    Object.assign(currentDataset, nextDataset);

    return currentDataset;
  });
}
