import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import eslint from 'rollup-plugin-eslint'
import pkg from './package.json'

export default 	{
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs' },
  ],
  external: ['alfy', 'querystring'],
  plugins: [
    resolve(),
    commonjs(),
    eslint({
      throwOnError: true,
      include: ['src/*'],
    })
  ],
}