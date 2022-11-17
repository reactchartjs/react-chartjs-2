# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [5.0.0](https://github.com/reactchartjs/react-chartjs-2/compare/v4.3.1...v5.0.0) (2022-11-17)


### ⚠ BREAKING CHANGES

* no commonjs support

### Features

* chart.js v4 support ([#1109](https://github.com/reactchartjs/react-chartjs-2/issues/1109)) ([deb2110](https://github.com/reactchartjs/react-chartjs-2/commit/deb211084757225e3ddb2574b567e805ba7eeeb6))
* package type module ([#1108](https://github.com/reactchartjs/react-chartjs-2/issues/1108)) ([6eb8ce7](https://github.com/reactchartjs/react-chartjs-2/commit/6eb8ce7f23654e46d17aedc104375112b2f2a955))


### Bug Fixes

* **deps:** update dependency chart.js to v4 ([#1104](https://github.com/reactchartjs/react-chartjs-2/issues/1104)) ([6192408](https://github.com/reactchartjs/react-chartjs-2/commit/61924087de28a7ee0bba6f61c50a0bde362b662c))
* **deps:** update dependency react-scripts to v5.0.1 ([#1049](https://github.com/reactchartjs/react-chartjs-2/issues/1049)) ([38a9796](https://github.com/reactchartjs/react-chartjs-2/commit/38a9796f1cefa63390d4eaf3eec960c77fe78d34))
* **deps:** update react monorepo to v18 ([#1031](https://github.com/reactchartjs/react-chartjs-2/issues/1031)) ([ad73425](https://github.com/reactchartjs/react-chartjs-2/commit/ad734256e173353222995b4edfbf7a8ad0dc96f3))
* **deps:** update react monorepo to v18.2.0 ([#1082](https://github.com/reactchartjs/react-chartjs-2/issues/1082)) ([72e7352](https://github.com/reactchartjs/react-chartjs-2/commit/72e7352fcdff182465bfdcd6a7f6c4579d062d01))
* **site:** [#1076](https://github.com/reactchartjs/react-chartjs-2/issues/1076) expand the docusaurus container content to give the sandboxes more space ([#1077](https://github.com/reactchartjs/react-chartjs-2/issues/1077)) ([b512e8d](https://github.com/reactchartjs/react-chartjs-2/commit/b512e8dc130e28c1284be77d4ef6c3a788b9e262))

### [4.3.1](https://github.com/reactchartjs/react-chartjs-2/compare/v4.3.0...v4.3.1) (2022-07-13)


### Bug Fixes

* update options without resetting chart ([#1061](https://github.com/reactchartjs/react-chartjs-2/issues/1061)) ([fa0a4bb](https://github.com/reactchartjs/react-chartjs-2/commit/fa0a4bbdb3d85735db289494c4bdf1da083a51da))

## [4.3.0](https://github.com/reactchartjs/react-chartjs-2/compare/v4.2.0...v4.3.0) (2022-07-12)


### Features

* assure redraw occurs when type changes ([#1054](https://github.com/reactchartjs/react-chartjs-2/issues/1054)) ([#1055](https://github.com/reactchartjs/react-chartjs-2/issues/1055)) ([bf0538f](https://github.com/reactchartjs/react-chartjs-2/commit/bf0538fd953ee878659d0b5647676fbfda460c76))

## [4.2.0](https://github.com/reactchartjs/react-chartjs-2/compare/v4.1.0...v4.2.0) (2022-06-07)


### Features

* implement passing updateMode property to chart's update method ([#1043](https://github.com/reactchartjs/react-chartjs-2/issues/1043)) ([96d2714](https://github.com/reactchartjs/react-chartjs-2/commit/96d2714c3df88346152a1b66b8fe729d43151e40))

## [4.1.0](https://github.com/reactchartjs/react-chartjs-2/compare/v4.0.1...v4.1.0) (2022-04-07)


### Features

* react 18 support ([#1034](https://github.com/reactchartjs/react-chartjs-2/issues/1034)) ([058035a](https://github.com/reactchartjs/react-chartjs-2/commit/058035a3e2da17ad9ee0c9f50793da3aaefb3913))

### [4.0.1](https://github.com/reactchartjs/react-chartjs-2/compare/v4.0.0...v4.0.1) (2022-01-19)


### Bug Fixes

* compatability with react 16 typings ([#987](https://github.com/reactchartjs/react-chartjs-2/issues/987)) ([4a01054](https://github.com/reactchartjs/react-chartjs-2/commit/4a010540ac01b1e4b299705ddd93f412df4875d1)), closes [#870](https://github.com/reactchartjs/react-chartjs-2/issues/870)
* **deps:** update dependency @svgr/webpack to v6 ([#999](https://github.com/reactchartjs/react-chartjs-2/issues/999)) ([7611ebd](https://github.com/reactchartjs/react-chartjs-2/commit/7611ebdbdbf4e91991b1a15d393fbadf2de01246))
* **deps:** update dependency react-scripts to v5 ([#1001](https://github.com/reactchartjs/react-chartjs-2/issues/1001)) ([3936227](https://github.com/reactchartjs/react-chartjs-2/commit/3936227b4e6865bbd20419af4a5b0b49561f608c))
* **deps:** update docusaurus monorepo to v2.0.0-beta.14 ([#994](https://github.com/reactchartjs/react-chartjs-2/issues/994)) ([2a24ee9](https://github.com/reactchartjs/react-chartjs-2/commit/2a24ee92203c703d16c3784eccb0011b5b870802))

## [4.0.0](https://github.com/reactchartjs/react-chartjs-2/compare/v3.3.0...v4.0.0) (2021-11-22)


### ⚠ BREAKING CHANGES

* getDatasetAtEvent, getElementAtEvent and getElementsAtEvent props are removed,
utils with the same names can used instead
* New target browsers: ie 11 dropped for regular bundle, modern bundle builds for
browsers with es6 modules support.
* Functional data prop is removed
* Added support of tree-shaking of Chart.js. Now you should register Chart.js
components by yourself.
* default export is renamed to Chart
* Chart.js re-exports are removed

### Features

* datasetIdKey prop ([#848](https://github.com/reactchartjs/react-chartjs-2/issues/848)) ([f895766](https://github.com/reactchartjs/react-chartjs-2/commit/f895766f012c0d3781d75b5f83adc6dbc8de0b03))


* default export is renamed to Chart ([#836](https://github.com/reactchartjs/react-chartjs-2/issues/836)) ([131daa0](https://github.com/reactchartjs/react-chartjs-2/commit/131daa008d3a3c280ba9e751c67ca926708b60e4))
* functional data prop is removed ([#840](https://github.com/reactchartjs/react-chartjs-2/issues/840)) ([b64dfb0](https://github.com/reactchartjs/react-chartjs-2/commit/b64dfb0430bf5817a5f8b8708551934ad426921e))
* getDatasetAtEvent, getElementAtEvent and getElementsAtEvent props are removed ([#845](https://github.com/reactchartjs/react-chartjs-2/issues/845)) ([6a9b2a7](https://github.com/reactchartjs/react-chartjs-2/commit/6a9b2a7527d23e7409c9273ad32eb100122ffb51))
* new target browsers ([#841](https://github.com/reactchartjs/react-chartjs-2/issues/841)) ([b1e83db](https://github.com/reactchartjs/react-chartjs-2/commit/b1e83db599e7f9b832c2fe1942b5e5f296730dd9))
* removed chart.js re-exports ([#835](https://github.com/reactchartjs/react-chartjs-2/issues/835)) ([30d5c2d](https://github.com/reactchartjs/react-chartjs-2/commit/30d5c2d457eae0b1142ea4ffb6eff8f583b60817))
* tree-shaking ([#839](https://github.com/reactchartjs/react-chartjs-2/issues/839)) ([fcd2849](https://github.com/reactchartjs/react-chartjs-2/commit/fcd2849037bb01d2eeadbfbc90c90054eb620d4c))

## [3.3.0](https://github.com/reactchartjs/react-chartjs-2/compare/v3.2.0...v3.3.0) (2021-10-26)


### Features

* export chart props types ([#810](https://github.com/reactchartjs/react-chartjs-2/issues/810)) ([82ab334](https://github.com/reactchartjs/react-chartjs-2/commit/82ab334c62939fb4924ed6021502fccfea29a5a2)), closes [#720](https://github.com/reactchartjs/react-chartjs-2/issues/720)


### Bug Fixes

* data updating fix ([#807](https://github.com/reactchartjs/react-chartjs-2/issues/807)) ([45a50cc](https://github.com/reactchartjs/react-chartjs-2/commit/45a50cc46196ce64088a463b6f3b384a6c98eb06)), closes [#806](https://github.com/reactchartjs/react-chartjs-2/issues/806)

## [3.2.0](https://github.com/reactchartjs/react-chartjs-2/compare/v3.1.1...v3.2.0) (2021-10-21)


### Features

* remove lodash ([#784](https://github.com/reactchartjs/react-chartjs-2/issues/784)) ([5594170](https://github.com/reactchartjs/react-chartjs-2/commit/559417024ef2fb34005727ff16d8fae8615cb071))


### Bug Fixes

* improve and fix rerendering ([#790](https://github.com/reactchartjs/react-chartjs-2/issues/790)) ([330fb1c](https://github.com/reactchartjs/react-chartjs-2/commit/330fb1cf0913bdbacda5ef755fb58c79482e1ea2))
* multitype chart typings ([#792](https://github.com/reactchartjs/react-chartjs-2/issues/792)) ([2f19eb3](https://github.com/reactchartjs/react-chartjs-2/commit/2f19eb3eba9681f383ca23e7a3a1f1c581c89061))

### [3.1.1](https://github.com/reactchartjs/react-chartjs-2/compare/v3.1.0...v3.1.1) (2021-10-19)


### Bug Fixes

* components' props types ([#782](https://github.com/reactchartjs/react-chartjs-2/issues/782)) ([eba8a27](https://github.com/reactchartjs/react-chartjs-2/commit/eba8a2794bb802dacc395a450110af8765fea868)), closes [#734](https://github.com/reactchartjs/react-chartjs-2/issues/734) [#741](https://github.com/reactchartjs/react-chartjs-2/issues/741)

## [3.1.0](https://github.com/reactchartjs/react-chartjs-2/compare/v2.4.0...v3.1.0) (2021-10-17)


### Features

* Reduced package size


### Bug Fixes

* minor types fixes ([#759](https://github.com/reactchartjs/react-chartjs-2/issues/759)) ([fe6c00f](https://github.com/reactchartjs/react-chartjs-2/commit/fe6c00f05cdc3099a66a7ac0c05fb5e6f216209a))
