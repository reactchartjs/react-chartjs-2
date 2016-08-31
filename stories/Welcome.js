import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

const styles = {
  main: {
    margin: 15,
    maxWidth: 600,
    lineHeight: 1.4,
    fontFamily: '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif',
  },

  logo: {
    width: 200,
  },

  link: {
    color: '#1474f3',
    textDecoration: 'none',
    borderBottom: '1px solid #1474f3',
    paddingBottom: 2,
  },

  code: {
    fontSize: 15,
    fontWeight: 600,
    padding: "2px 5px",
    border: "1px solid #eae9e9",
    borderRadius: 4,
    backgroundColor: '#f3f2f2',
    color: '#3a3a3a',
  },
};

const Welcome = props => (
  <div style={styles.main}>
    <h1>React wrapper for Chart.js</h1>
    <p>
      Use the links on the left to see variations of usage, with different props.
    </p>
    <p>
      See also&nbsp;
      <a href="http://gor181.github.io/react-chartjs-2/">Examples</a>
      <a href="https://github.com/gor181/react-chartjs-2">Code</a>
    </p>
  </div>
);

storiesOf('Welcome', module)
  .add('to react-chartjs-2', () => (
    <Welcome />
  ));

