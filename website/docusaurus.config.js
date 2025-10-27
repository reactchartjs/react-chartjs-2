// @ts-check

const branch = require('git-branch');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const currentBranch = process.env.BRANCH || branch.sync();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'react-chartjs-2',
  tagline: 'React wrapper for Chart.js',
  url: 'https://react-chartjs-2.js.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  favicon: 'img/favicon.ico',
  organizationName: 'reactchartjs',
  projectName: 'react-chartjs-2',
  noIndex: currentBranch !== 'master',

  customFields: {
    branch: currentBranch,
  },

  scripts: [
    {
      src: 'https://cloud.umami.is/script.js',
      'data-website-id': 'c15ead0d-e003-4fe0-8647-ddf0b560e38c',
      defer: true
    }
  ],

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
      metadata: [
        {
          name: 'google-site-verification',
          content: 'JbpBLn9A_qAr4OqSunPoFWeahyME9dMplBMUsaOK_I4'
        }
      ],
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
            href: 'https://stackoverflow.com/questions/tagged/react-chartjs-2',
            label: 'Stack Overflow',
            position: 'right',
          },
          {
            href: 'https://github.com/reactchartjs/react-chartjs-2',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        appId: 'BH4D9OD16A',
        apiKey: 'd59187de89e7935f588bbb2fc9273f03',
        indexName: 'react-chartjs-2',
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
