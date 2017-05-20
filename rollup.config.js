import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'

export default {
  entry: 'src/main.js',
  dest: 'dist/bundle.js',
  format: 'es',
  sourceMap: 'inline',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),

    resolve({
      jsnext: true,
    }),

    commonjs(),

    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        'react',
      ],
      plugins: [
        'external-helpers',
      ],
    }),
  ],
}

// vim: set ts=2 sw=2 et:
