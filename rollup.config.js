import resolve from "@rollup/plugin-node-resolve";
import dts from "rollup-plugin-dts";
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from '@rollup/plugin-json';
import react from 'react';
import reactDom from 'react-dom';

const packageJson = require("./package.json");


export default [
  {
    input: "src/index.js",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
         postcss({
        plugins: [],
        minimize: true,
      }),
      resolve(),
         terser(),
         
            commonjs(
                { include: /node_modules/ ,
                 namedExports: {
    react: Object.keys(react),
    'react-dom': Object.keys(reactDom)
  }
    
    }
                ),
             json(),
          babel({ 
        exclude: 'node_modules/**',
        presets: ['@babel/env', '@babel/preset-react']
    }),
  
    ],
  },
  {
     input: "dist/esm/index.js",
    output: [{ file: "dist/index.js", format: "esm" }],
    plugins: [dts()],
  },
];