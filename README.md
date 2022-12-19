# react-chartjs-2

<img align="right" width="150" height="150" alt="Logo" src="website/static/img/logo.svg">

React components for <a href="https://www.chartjs.org">Chart.js</a>, the most popular charting library.

Supports Chart.js v4 and v3.

[![NPM version][npm]][npm-url]
[![Downloads][downloads]][downloads-url]
[![Build status][build]][build-url]
[![Coverage status][coverage]][coverage-url]
[![Bundle size][size]][size-url]

[npm]: https://img.shields.io/npm/v/react-chartjs-2.svg
[npm-url]: https://www.npmjs.com/package/react-chartjs-2

[downloads]: https://img.shields.io/npm/dm/react-chartjs-2.svg
[downloads-url]: https://www.npmjs.com/package/react-chartjs-2

[build]: https://img.shields.io/github/actions/workflow/status/reactchartjs/react-chartjs-2/ci.yml?branch=master
[build-url]: https://github.com/reactchartjs/react-chartjs-2/actions

[coverage]: https://img.shields.io/codecov/c/github/reactchartjs/react-chartjs-2.svg
[coverage-url]: https://app.codecov.io/gh/reactchartjs/react-chartjs-2

[size]: https://img.shields.io/bundlephobia/minzip/react-chartjs-2
[size-url]: https://bundlephobia.com/package/react-chartjs-2

<br />
<a href="#quickstart">Quickstart</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#docs">Docs</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://slack.cube.dev/?ref=eco-react-chartjs">Slack</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://stackoverflow.com/questions/tagged/react-chartjs-2">Stack Overflow</a>
<br />
<hr />

## Quickstart

Install this library with peer dependencies:

```bash
pnpm add react-chartjs-2 chart.js
# or
yarn add react-chartjs-2 chart.js
# or
npm i react-chartjs-2 chart.js
```

We recommend using `chart.js@^4.0.0`.

Then, import and use individual components:

```jsx
import { Doughnut } from 'react-chartjs-2';

<Doughnut data={...} />
```

Need an API to fetch data? Consider [Cube](https://cube.dev/?ref=eco-react-chartjs), an open-source API for data apps.

<br />

[![supported by Cube](https://user-images.githubusercontent.com/986756/154330861-d79ab8ec-aacb-4af8-9e17-1b28f1eccb01.svg)](https://cube.dev/?ref=eco-react-chartjs)

## Docs

- [Migration to v4](https://react-chartjs-2.js.org/docs/migration-to-v4)
- [Working with datasets](https://react-chartjs-2.js.org/docs/working-with-datasets)
- [Working with events](https://react-chartjs-2.js.org/docs/working-with-events)
- [FAQ](https://react-chartjs-2.js.org/faq)
- [Components](https://react-chartjs-2.js.org/components)
- [Examples](https://react-chartjs-2.js.org/examples)

## License

[MIT Licensed](LICENSE)
Copyright (c) 2020 Jeremy Ayerst
