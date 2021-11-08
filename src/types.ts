import type { CanvasHTMLAttributes, ForwardedRef, ReactNode } from 'react';
import type {
  Chart,
  ChartType,
  ChartData,
  ChartOptions,
  DefaultDataPoint,
  Plugin,
} from 'chart.js';

export interface ChartProps<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
> extends CanvasHTMLAttributes<HTMLCanvasElement> {
  type: TType;
  data: ChartData<TType, TData, TLabel>;
  options?: ChartOptions<TType>;
  plugins?: Plugin<TType>[];
  redraw?: boolean;
  datasetIdKey?: string;
  /**
   * @todo Replace with `children` prop.
   */
  fallbackContent?: ReactNode;
}

/**
 * @todo Replace `undefined` with `null`
 */
export type ChartJSOrUndefined<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
> = Chart<TType, TData, TLabel> | undefined;

export type TypedChartComponent<
  TDefaultType extends ChartType = ChartType,
  TOmitType = false
> = TOmitType extends true
  ? <TData = DefaultDataPoint<TDefaultType>, TLabel = unknown>(
      props: Omit<ChartProps<TDefaultType, TData, TLabel>, 'type'> & {
        ref?: ForwardedRef<ChartJSOrUndefined<TDefaultType, TData, TLabel>>;
      }
    ) => JSX.Element
  : <
      TType extends ChartType = ChartType,
      TData = DefaultDataPoint<TType>,
      TLabel = unknown
    >(
      props: ChartProps<TType, TData, TLabel> & {
        ref?: ForwardedRef<ChartJSOrUndefined<TType, TData, TLabel>>;
      }
    ) => JSX.Element;
