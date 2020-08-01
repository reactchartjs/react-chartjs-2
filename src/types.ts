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
}
