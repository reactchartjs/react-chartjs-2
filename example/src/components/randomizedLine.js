import React from 'react';
import {Line} from 'react-chartjs-2';

const initialState = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};



const Graph = React.createClass({
	displayName: 'Graph',
	componentWillMount(){
		this.setState(initialState);
	},
	componentDidMount(){

		var _this = this;

		setInterval(function(){
			var oldDataSet = _this.state;
			var newData = [];

			for(var x=0; x< _this.state.labels.length; x++){
				newData.push(Math.floor(Math.random() * 100));
			}

			var newDataSet = Object.assign({}, oldDataSet);
			newDataSet.data = newData;

			_this.setState({datasets: [newDataSet]});
		}, 5000);
	},
	render() {
		return (
			<Line data={this.state} />
		);
	}
});




export default React.createClass({
  displayName: 'RandomizedDataLineExample',

  render() {
    return (
      <div>
        <h2>Random Animated Line Example</h2>
 		<Graph />
      </div>
    );
  }
});
