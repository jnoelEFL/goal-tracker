// Configuration Webpack
// =====================

const Path = require('path')
const parts = require('./webpack.config.parts')
const merge = require('webpack-merge')

const PATHS = {
  app: Path.resolve(__dirname, '../src'),
  build: Path.resolve(__dirname, '../public'),
  static: Path.resolve(__dirname, '../static'),
}

const CORE_CONFIG = merge([
  {
    entry: {
      app: ['babel-polyfill', PATHS.app],
    },
    output: {
      filename: '[name].js',
      path: PATHS.build,
      publicPath: '/',
    },
  },
  parts.friendlyErrors(),
  parts.autoResolveModulesFrom(PATHS.app),
  parts.babelize({ include: PATHS.app }),
  parts.loadImages({ include: PATHS.app }),
  parts.autoVendor(),
  parts.safeAssetEmission(),
  parts.copyStatic({ from: PATHS.static, to: PATHS.build }),
])

const devConfig = () =>
  merge([
    parts.hmr({ react: true }),
    CORE_CONFIG,
    parts.loadCSS(),
    parts.loadStylus({ include: PATHS.app }),
    parts.generateSourceMaps(),
  ])

const productionConfig = () =>
  merge([
    CORE_CONFIG,
    parts.cleanup(PATHS.build),
    parts.extractCSS({ filename: 'app.css' }),
    parts.extractStylus({ filename: 'app.css' }),
    parts.minifyAll({
      cssOptions: {
        discardComments: { removeAll: true },
        safe: true,
      },
    }),
    parts.offline(),
  ])

module.exports = (env = process.env.NODE_ENV) =>
  env === 'production' ? productionConfig() : devConfig()
