import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

const env = process.env.NODE_ENV;

const config = {
  entry: 'src/index.js',
  external: ['chart.js', 'react'],
  globals: {
    'chart.js': 'Chart',
    react: 'React'
  },
  exports: 'named',
  format: 'umd',
  moduleName: 'ReactChartjs2',
  plugins: [
    nodeResolve(),
    babel({
      exclude: '**/node_modules/**',
    }),
    commonjs(),
  ],
};

if (env === 'production') {
   config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      },
    })
  );
}

export default config;
