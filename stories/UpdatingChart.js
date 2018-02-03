import React from 'react';
import { Bar } from 'react-chartjs-2';
import { storiesOf } from '@kadira/storybook';

const srcData = [
  {
    year: 2015,
    data: [
      536531,
      1017273,
      1496702,
      1882366,
      2228939,
      2515784,
      2753399,
      2966478,
      3236838,
      3613068,
      4047828,
      4547209
    ],
    color: 'hsla(50,100%,59.21569%,1)'
  },
  {
    year: 2016,
    data: [
      551503,
      1057792,
      1521903,
      1908192,
      2191201,
      2412114,
      2634171,
      2900548,
      3159543,
      3552987,
      4052115,
      4553624
    ],
    color: 'hsla(104,46.15384%,54.11765%,1)'
  },
  {
    year: 2017,
    data: [
      546988,
      1031054,
      1526958,
      1929360,
      2219497,
      2472468,
      2654013,
      2876660,
      3125501,
      3464636,
      3911575,
      3976944
    ],
    color: 'hsla(191,100%,36.66667%,1)'
  }
];

const options = {
  responsive: true,
  tooltips: {
    mode: 'label'
  },
  elements: {
    line: {
      fill: false,
      lineTension: 0
    }
  },
  scales: {
    yAxes: [
      {
        tics: { min: 0 }
      }
    ]
  },
  legend: {
    display: true,
    position: 'bottom',
    reverse: true,
    onClick: null
  }
};

storiesOf('Updating chart Example', module).add('Line & Bar', () => {
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const Chart = ({ data }) => {
    const config = {
      labels: labels,
      datasets: data.map((series, idx, arr) => {
        let { year, data, color } = series;
        return {
          id: year,
          type: idx < arr.length - 1 ? 'line' : 'bar',
          label: year,
          data: data,
          backgroundColor: color,
          borderColor: color
        };
      })
    };
    return <Bar data={config} options={options} />;
  };

  class SelectAndChart extends React.Component {
    constructor() {
      super();
      this.state = { data: srcData.map(s => ({ ...s, selected: true })) };
    }

    toggleYear(year) {
      this.setState(state => {
        return {
          data: state.data.map(s => ({
            ...s,
            selected: year === s.year ? !s.selected : s.selected
          }))
        };
      });
    }

    render() {
      return (
        <div>
          <Chart data={this.state.data.filter(series => series.selected)} />
          <Select data={this.state.data} toggle={this.toggleYear.bind(this)} />
        </div>
      );
    }
  }

  const Select = ({ data, toggle }) => {
    return (
      <div>
        {data.map(({ year, selected }) => (
          <div key={year}>
            <input
              type="checkbox"
              checked={selected}
              onChange={toggle.bind(null, year)}
            />
            <label htmlFor={year}>{year}</label>
          </div>
        ))}
      </div>
    );
  };

  return <SelectAndChart />;
});
