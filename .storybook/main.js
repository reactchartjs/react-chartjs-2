const path = require('path');
const { mergeConfig } = require('vite');

module.exports = {
  core: {
    builder: '@storybook/builder-vite',
  },
  viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          'react-chartjs-2': path.resolve(__dirname, '../src'),
        },
      },
    });
  },
  stories: ['../stories/*.tsx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
  ],
};
