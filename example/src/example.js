import React from 'react';
import ReactDOM from 'react-dom';

import DoughnutExample from './components/doughnut';
import PieExample from './components/pie';
import LineExample from './components/line';
import BarExample from './components/bar';
import RadarExample from './components/radar';
import PolarExample from './components/polar';

class App extends React.Component {
	render() {
		return (
			<div>
				<hr />
				<DoughnutExample />
				<hr />
				<PieExample />
				<hr />
				<LineExample />
				<hr />
				<BarExample />
				<hr />
				<RadarExample />
				<hr />
				<PolarExample />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
