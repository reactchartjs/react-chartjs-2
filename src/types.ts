export interface DataFn {
  (canvas: HTMLCanvasElement | null): Chart.ChartData
}

export interface Props {
  id?: string
  height?: number
  width?: number
  redraw?: boolean
  type: Chart.ChartType
  data: Chart.ChartData | DataFn
  options?: Chart.ChartOptions
  plugins?: Chart.PluginServiceRegistrationOptions[]
  getDatasetAtEvent?: (
    dataset: Array<{}>,
    event: React.MouseEvent<HTMLCanvasElement>
  ) => unknown
  getElementAtEvent?: (
    element: [{}],
    event: React.MouseEvent<HTMLCanvasElement>
  ) => unknown
  getElementsAtEvent?: (
    elements: Array<{}>,
    event: React.MouseEvent<HTMLCanvasElement>
  ) => unknown
}
