const path = require('path');

module.exports = {
  stories: ['../stories/*.tsx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
  ],
  webpackFinal(config) {
    config.resolve.alias['react-chartjs-2'] = path.resolve(__dirname, '../src');
    return config;
  },
};
