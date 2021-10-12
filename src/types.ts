import Chart from './index';

export interface Props extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  id?: string;
  className?: string;
  height?: number;
  width?: number;
  redraw?: boolean;
  type: Chart.ChartType;
  data: Chart.ChartData | ((canvas: HTMLCanvasElement) => Chart.ChartData);
  options?: Chart.ChartOptions;
  fallbackContent?: React.ReactNode;
  plugins?: Chart.PluginServiceRegistrationOptions[];
  getDatasetAtEvent?: (
    dataset: Array<{}>,
    event: React.MouseEvent<HTMLCanvasElement>
  ) => void;
  getElementAtEvent?: (
    element: InteractionItem[],
    event: React.MouseEvent<HTMLCanvasElement>
  ) => void;
  getElementsAtEvent?: (
    elements: Array<{}>,
    event: React.MouseEvent<HTMLCanvasElement>
  ) => void;
}
