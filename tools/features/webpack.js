import express from 'express'
import { join as joinPaths } from 'path'
import webpack from 'webpack'
import DashboardPlugin from 'webpack-dashboard/plugin'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'

const configFile = joinPaths(__dirname, '../../webpack/webpack.config')
const config = require(configFile)(process.env.NODE_ENV)
const compiler = webpack(config)
compiler.apply(new DashboardPlugin())

const router = new express.Router()

export const STATIC_PATH = joinPaths(__dirname, '../../static')

router.use(
  devMiddleware(compiler, {
    quiet: true, // We use Friendly Errors
    noInfo: true,
    publicPath: config.output.publicPath,
    contentBase: STATIC_PATH,
  })
)
router.use(
  hotMiddleware(compiler, {
    overlay: true,
    reload: true,
  })
)

console.log('⚡️  Webpack dev/hot server configured.  Bundle building…'.green)

export default router
