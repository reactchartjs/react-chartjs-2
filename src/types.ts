import Chart from 'chart.js/auto';

export interface Props {
  id?: string;
  height?: number;
  width?: number;
  redraw?: boolean;
  type: Chart.ChartType;
  data: Chart.ChartData | ((canvas: HTMLCanvasElement) => Chart.ChartData);
  options?: Chart.ChartOptions;
  plugins?: Chart.PluginServiceRegistrationOptions[];
  getDatasetAtEvent?: (
    dataset: Array<{}>,
    event: React.MouseEvent<HTMLCanvasElement>
  ) => void;
  getElementAtEvent?: (
    element: [{}],
    event: React.MouseEvent<HTMLCanvasElement>
  ) => void;
  getElementsAtEvent?: (
    elements: Array<{}>,
    event: React.MouseEvent<HTMLCanvasElement>
  ) => void;
  // generateLegend?: (
  //   element: [{}],
  //   event: React.MouseEvent<HTMLCanvasElement>
  // ) => void;
  // getElementsAtXAxis?: (
  //   elements: Array<{}>,
  //   event: React.MouseEvent<HTMLCanvasElement>
  // ) => void;
}
