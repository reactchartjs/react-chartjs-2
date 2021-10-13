import swc from 'rollup-plugin-swc';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json';

const extensions = ['.js', '.ts', '.tsx'];
const external = _ => /node_modules/.test(_) && !/@swc\/helpers/.test(_);
const plugins = [
  nodeResolve({
    extensions,
  }),
  swc({
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
      },
      transform: {
        react: {
          useBuiltins: true,
        },
      },
      externalHelpers: true,
    },
    env: {
      targets: 'defaults',
    },
    module: {
      type: 'es6',
    },
    sourceMaps: true,
  }),
];

export default [
  {
    input: 'src/index.tsx',
    plugins,
    external,
    output: {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
  },
  {
    input: 'src/index.tsx',
    plugins,
    external,
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  },
];
