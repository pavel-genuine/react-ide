import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import json from "@rollup/plugin-json";
import react from "react";
import reactDom from "react-dom";
import nodePolyfills from "rollup-plugin-node-polyfills";

export default [
  {
    input: "src/index.js",
    output: [
      {
        dir: "dist/cjs",
        format: "cjs",
      },
    ],
    plugins: [
      nodePolyfills(),
      postcss({
        plugins: [],
        minimize: true,
      }),
      resolve(),
      terser(),

      commonjs({
        include: /node_modules/,
        namedExports: {
          react: Object.keys(react),
          "react-dom": Object.keys(reactDom),
        },
      }),
      json(),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/env", "@babel/preset-react"],
      }),
    ],
  },
];
