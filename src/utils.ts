import type { ForwardedRef } from 'react';
import type {
  ChartType,
  ChartData,
  DefaultDataPoint,
  ChartDataset,
  ChartOptions,
  Chart,
} from 'chart.js';

export function reforwardRef<T>(ref: ForwardedRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export function setOptions<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(chart: Chart<TType, TData, TLabel>, nextOptions: ChartOptions<TType>) {
  chart.options = { ...nextOptions };
}

export function setLabels<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(
  currentData: ChartData<TType, TData, TLabel>,
  nextLabels: TLabel[] | undefined
) {
  currentData.labels = nextLabels;
}

export function setDatasets<
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
    if (!currentDataset || !nextDataset.data) return { ...nextDataset };

    Object.assign(currentDataset, nextDataset);

    return currentDataset;
  });
}

export function cloneData<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(data: ChartData<TType, TData, TLabel>) {
  const nextData: ChartData<TType, TData, TLabel> = {
    labels: [],
    datasets: [],
  };

  setLabels(nextData, data.labels);
  setDatasets(nextData, data.datasets);

  return nextData;
}
