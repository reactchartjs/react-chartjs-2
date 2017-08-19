import React from 'react';

import DoughnutExample from './doughnut';
import DynamicDoughnutExample from './dynamic-doughnut';
import PieExample from './pie';
import LineExample from './line';
import BarExample from './bar';
import HorizontalBarExample from './horizontalBar';
import RadarExample from './radar';
import PolarExample from './polar';
import BubbleExample from './bubble';
import ScatterExample from './scatter';
import MixedDataExample from './mix';
import RandomizedDataLineExample from './randomizedLine';
import CrazyDataLineExample from './crazyLine';
import LegendOptionsExample from './legend-options';
import LegendHandlersExample from './legend-handlers';

export default class App extends React.Component {
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
