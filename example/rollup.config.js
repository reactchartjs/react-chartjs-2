import htmlTemplate from "rollup-plugin-generate-html-template";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import alias from "@rollup/plugin-alias";
import path from "path";

const pathResolve = (loc) => path.resolve(__dirname, loc);

export default {
  input: pathResolve("src/index.js"),
  output: {
    file: pathResolve("dist/js/bundle.js"),
  },
  plugins: [
    htmlTemplate({
      template: pathResolve("src/index.html"),
      target: pathResolve("dist/index.html"),
    }),
    resolve(),
    babel({
      babelHelpers: "bundled",
      exclude: "**/node_modules/**",
    }),
    commonjs(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    alias({
      entries: [{ find: "react-chartjs-2", replacement: "../../../src" }],
    }),
  ],
};
