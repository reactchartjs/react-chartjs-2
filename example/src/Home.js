import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <div className='header'>
      <h1 className='title'>react-chartjs-2</h1>
      <h2 className='subtitle'>React wrapper for Chart.js</h2>
      <div className='links'>
        <a
          className='btn btn-npm'
          href='https://www.npmjs.com/package/react-chartjs-2'
        >
          NPM
        </a>
        <a
          className='btn btn-gh'
          href='https://github.com/reactchartjs/react-chartjs-2'
        >
          Github
        </a>
        <a className='btn btn-chartjs' href='https://www.chartjs.org'>
          Chart.js
        </a>
      </div>
    </div>
    <hr />
    <div className='categories'>
      <div className='category'>
        <h3 className='title'>Bar Charts</h3>
        <ul className='items'>
          <li className='entry'>
            <Link to='/vertical-bar'>Vertical</Link>
          </li>
          <li className='entry'>
            <Link to='/horizontal-bar'>Horizontal</Link>
          </li>
          <li className='entry'>
            <Link to='/grouped-bar'>Grouped</Link>
          </li>
          <li className='entry'>
            <Link to='/stacked-bar'>Stacked</Link>
          </li>
        </ul>
      </div>
      <div className='category'>
        <h3 className='title'>Line Charts</h3>
        <ul className='items'>
          <li className='entry'>
            <Link to='/line'>Basic</Link>
          </li>
          <li className='entry'>
            <Link to='/multi-axis-line'>Multi Axis</Link>
          </li>
        </ul>
      </div>
      <div className='category'>
        <h3 className='title'>Other Charts</h3>
        <ul className='items'>
          <li className='entry'>
            <Link to='/scatter'>Scatter</Link>
          </li>
          <li className='entry'>
            <Link to='/doughnut'>Doughnut</Link>
          </li>
          <li className='entry'>
            <Link to='/pie'>Pie</Link>
          </li>
          <li className='entry'>
            <Link to='/polar'>Polar</Link>
          </li>
          <li className='entry'>
            <Link to='/radar'>Radar</Link>
          </li>
        </ul>
      </div>
      <div className='category'>
        <h3 className='title'>Advanced Charts</h3>
        <ul className='items'>
          <li className='entry'>
            <Link to='/dynamic-bar'>Dynamic</Link>
          </li>
          <li className='entry'>
            <Link to='/multi'>Multi Type</Link>
          </li>
          <li className='entry'>
            <Link to='/crazy'>Crazy</Link>
          </li>
        </ul>
      </div>
      <div className='category'>
        <h3 className='title'>Events</h3>
        <ul className='items'>
          <li className='entry'>
            <Link to='/click-events'>Click Events</Link>
          </li>
        </ul>
      </div>
    </div>
    <hr />
    <div className='footer'>
      <h6>
        For questions or issues please visit{' '}
        <a href='https://github.com/reactchartjs/react-chartjs-2/issues'>
          Github
        </a>
      </h6>
    </div>
  </>
);

export default Home;
