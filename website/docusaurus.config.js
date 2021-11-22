// @ts-check

const branch = require('git-branch');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const currentBranch = process.env.BRANCH || branch.sync();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'react-chartjs-2',
  tagline: 'React wrapper for Chart.js',
  url: 'https://reactchartjs.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'reactchartjs',
  projectName: 'react-chartjs-2',
  noIndex: currentBranch !== 'master',

  customFields: {
    branch: currentBranch,
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/reactchartjs/react-chartjs-2/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'react-chartjs-2',
        logo: {
          alt: 'react-chartjs-2 logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'faq/index',
            position: 'left',
            label: 'FAQ',
          },
          {
            type: 'doc',
            docId: 'components/index',
            position: 'left',
            label: 'Components',
          },
          {
            type: 'doc',
            docId: 'examples/index',
            position: 'left',
            label: 'Examples',
          },
          {
            href: 'https://github.com/reactchartjs/react-chartjs-2',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'FAQ',
                to: '/faq',
              },
              {
                label: 'Components',
                to: '/components',
              },
              {
                label: 'Examples',
                to: '/examples',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/react-chartjs-2',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/reactchartjs/react-chartjs-2',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} reactchartjs. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  plugins: [
    [
      'docusaurus-plugin-react-docgen-typescript',
      {
        src: '../src/**/*.tsx',
        parserOptions: {
          propFilter: prop => {
            if (prop.parent) {
              return !prop.parent.fileName.includes('@types/react');
            }

            return true;
          },
        },
      },
    ],
  ],
};

module.exports = config;
