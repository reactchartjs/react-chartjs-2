import React from 'react';
import ReactDOM from 'react-dom';

import DoughnutExample from './components/doughnut';
import DynamicDoughnutExample from './components/dynamic-doughnut';
import PieExample from './components/pie';
import LineExample from './components/line';
import BarExample from './components/bar';
import HorizontalBarExample from './components/horizontalBar';
import RadarExample from './components/radar';
import PolarExample from './components/polar';
import BubbleExample from './components/bubble';
import ScatterExample from './components/scatter';
import MixedDataExample from './components/mix';
import RandomizedDataLineExample from './components/randomizedLine';
import CrazyDataLineExample from './components/crazyLine';
import LegendOptionsExample from './components/legend-options'
import LegendHandlersExample from './components/legend-handlers'

class App extends React.Component {
	render() {
		return (
			<div>
				<hr />
				<DoughnutExample />
				<hr />
				<DynamicDoughnutExample />
				<hr />
				<PieExample />
				<hr />
				<LineExample />
				<hr />
				<BarExample />
				<hr />
				<HorizontalBarExample />
				<hr />
				<RadarExample />
				<hr />
				<PolarExample />
				<hr />
				<BubbleExample />
				<hr />
				<ScatterExample />
				<hr />
				<MixedDataExample />
				<hr />
				<RandomizedDataLineExample />
				<hr />
				<CrazyDataLineExample />
				<hr />
				<LegendOptionsExample />
				<hr />
				<LegendHandlersExample />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
