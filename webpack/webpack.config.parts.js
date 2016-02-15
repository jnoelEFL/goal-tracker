// Portions réutilisables pour la configuration Webpack
// ====================================================

const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const cssnano = require('cssnano')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const fs = require('fs')
const merge = require('webpack-merge')
const OfflinePlugin = require('offline-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const Path = require('path')
const webpack = require('webpack')

// Chargeurs de syntaxe
// --------------------
//
// C’est le cœur de Webpack: les chargeurs de syntaxe qui nous
// permettent, depuis notre JS, de déclarer nos dépendances à des
// *assets* quelconques (CSS, images, fontes…) via les mécanismes
// habituels d’`import`/`require`.

// CSS, SASS & Stylus
// ------------------

exports.extractCSS = () => extractStyling({ ext: 'css' })
exports.extractStylus = () => extractStyling({ ext: 'styl', name: 'stylus' })

exports.loadCSS = () => loadStyling({ ext: 'css' })
exports.loadStylus = () => loadStyling({ ext: 'styl', name: 'stylus' })

// On a recours à plusieurs images (en fait, que des PNG pour
// notre app, mais soyons inclusifs…), on utilisera donc le
// URL Loader, une spécialisation du File Loader.  Ici, si
// le fichier pèse moins de 10000 octets, il produira une URL
// *inline* ("Data URI"), économisant ainsi une requête réseau
// côté client.  Dans le cas contraire, il produira bien une
// URL normale vers un fichier.

exports.loadImages = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/,
        include,
        exclude,
        use: { loader: 'url-loader', options: { limit: 10000 } },
      },
    ],
  },
})

// Toute dépendance aboutissant à un fichier `.js` sera
// d’abord «moulinée» par Babel. On met les compilations en cache,
// avec un cache par environnement (dev, prod, test…), et on
// limitera probablement avec `include` et/ou `exclude`.  Les
// options de Babel sont tirées de sa config dans `package.json`,
// en s'assurant toutefois qu'on ne transpilera pas, dans Webpack,
// les syntaxes d'import/export de modules ES, car ça permet d'améliorer
// les perfs de *tree shaking* et de *module concatenation* de Webpack
// pour les builds de prod.

exports.babelize = ({ include, exclude } = {}) => {
  const options = JSON.parse(
    fs.readFileSync(Path.resolve(__dirname, '../package.json'))
  ).babel
  options.presets.forEach(function(preset) {
    if (preset instanceof Array && preset[0] === 'env') {
      preset[1].modules = false
    }
  })
  options.cacheDirectory = Path.resolve(
    __dirname,
    'node_modules',
    '.cache',
    'babel-loader',
    process.env.NODE_ENV || 'development'
  )

  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include,
          exclude,
          options,
        },
      ],
    },
  }
}

exports.autoResolveModulesFrom = (...paths) => ({
  resolve: {
    modules: ['node_modules', ...paths],
  },
})

exports.friendlyErrors = (
  { icon, notify = false, title = 'Webpack Build Error' } = {}
) => {
  let opts = {}
  if (notify) {
    const notifier = require('node-notifier')
    opts = {
      onErrors(severity, errors) {
        if (severity !== 'error') {
          return
        }

        const error = errors[0]
        notifier.notify({
          title,
          message: `${severity} : ${error.name}`,
          subtitle: error.file || '',
          icon,
        })
      },
    }
  }

  return {
    plugins: [new FriendlyErrorsWebpackPlugin(opts)],
  }
}

exports.safeAssetEmission = () => ({
  plugins: [
    // On évite que des erreurs Webpack (fichiers manquants, etc.)
    // plantent complètement le serveur: on se contente de les afficher
    // sur la console et on attend que ça change pour ré-essayer.
    new webpack.NoEmitOnErrorsPlugin(),
  ],
})

exports.copyStatic = ({ from, to }) => ({
  plugins: [
    // Copie / met à dispo en mémoire des fichiers statiques vers un
    // chemin en sortie.  On aurait pu les coller direct dans `public/`,
    // mais alors Webpack ne les aurait pas «détectés», et d’autres
    // plugins ne les auraient pas pris en compte (tels que la gestion
    // de l’*offline*, par exemple).
    new CopyWebpackPlugin([{ from, to }]),
  ],
})

// Optimisation du cache
// ---------------------

exports.autoVendor = () => ({
  plugins: [
    // On évite aussi d’inclure de base les 48Ko (gzippés !) de *locales* de
    // Moment.js, pour se limiter à ceux qu’on importe explicitement depuis notre
    // propre code.
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Extraction automatique des modules npm dans un bundle à part, `vendor.js`.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) =>
        resource && resource.includes('node_modules'),
    }),
  ],
})

// Source Maps
// -----------
//
// Webpack nous propose une bonne demi-douzaine de types de
// [source maps](https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)
// pour nos fichiers transpilés et le bundle final, mais seules
// certaines garantissent le bon fonctionnement des points
// d’arrêt dans Chrome.  On utilise ici celle qui, parmi les «bonnes»,
// est créée le plus vite par Webpack.
// devtool: '#inline-source-map'

exports.generateSourceMaps = ({ type = 'cheap-module-source-map' } = {}) => ({
  devtool: type,
})

// Nettoyage
// ---------
//
// Lorsqu'on pond des fichiers sur le disque lors du build (cas en
// build de production), il est utile de virer les anciens artefacts
// d'abord, surtout si on commence à hasher les noms…

exports.cleanup = (path) => ({
  plugins: [new CleanWebpackPlugin(path, { verbose: false })],
})

// Optimisations de taille du bundle
// ---------------------------------

exports.enableAutoMinifiers = () => ({
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
})

exports.minifyAll = ({ jsOptions, cssOptions } = {}) =>
  merge([
    exports.stripNonProductionCode(),
    exports.enableAutoMinifiers(),
    exports.minifyJavaScript(jsOptions),
    exports.minifyCSS(cssOptions),
  ])

// Minification des sources CSS grâce à CSSNano
exports.minifyCSS = (options = {}) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
})

// Minification des sources JS grâce
// à l’excellent [UglifyJS](http://lisperator.net/uglifyjs/).
exports.minifyJavaScript = (options = {}) => ({
  plugins: [
    // Utilisation du "scope hoisting" de Webpack 3, lorsque
    // c’est possible (modules ES)
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({ ...options, sourceMap: true }),
  ],
})

exports.stripNonProductionCode = () => ({
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
  ],
})

// Hot Module Replacement
// ----------------------

exports.hmr = ({ react = false }) => {
  return {
    entry: {
      app: [
        // Activation de React-Hot-Loader 3 en ajoutant à notre bundle
        // le "client" RHL3 assurant les remplacements avec persistance
        // de l’état local des composants.
        'react-hot-loader/patch',
        // En dev, on utilise le [HMR](https://webpack.github.io/docs/hot-module-replacement.html),
        // ce qui nécessite un petit morceau de JS «client» dans le bundle
        // exécuté au sein du navigateur.
        'webpack-hot-middleware/client',
      ],
    },
    plugins: [
      // La deuxième partie du HMR, le côté serveur.
      new webpack.HotModuleReplacementPlugin(),
      // Amélioration des affichages de modules lors du dev, au HMR et
      // dans la CLI.
      new webpack.NamedModulesPlugin(),
    ],
  }
}

// Offline management
// ------------------

// Super plugin de traitement *a posteriori* qui génère et maintient
// pour nous les fichiers nécessaires à un fonctionnement *offline-first*:
// source de ServiceWorker (`sw.js`) et solution de secours basée
// Application Cache (dossier `appcache`).
exports.offline = (options) => ({
  plugins: [new OfflinePlugin(options)],
})

// Fonctions d’assistance internes
// -------------------------------

function buildCSSLoaders({ ext, name = null, useStyle = false }) {
  const result = {
    test: new RegExp(`\\.${ext}$`),
    use: [
      { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
      {
        loader: 'postcss-loader',
        options: {
          plugins: (loader) => [require('autoprefixer')()],
          sourceMap: true,
        },
      },
    ],
  }

  if (name && name !== 'css') {
    result.use.push({
      loader: `${name}-loader`,
      options: { sourceMap: true },
    })
  }

  if (useStyle) {
    result.use.unshift('style-loader')
  }

  return result
}

let cssPlugin

function extractStyling({ ext, name }) {
  cssPlugin =
    cssPlugin ||
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    })

  const { test, use } = buildCSSLoaders({ ext, name })

  return {
    plugins: [cssPlugin],
    module: {
      rules: [
        {
          test,
          use: cssPlugin.extract({
            fallback: 'style-loader',
            use,
          }),
        },
      ],
    },
  }
}

function loadStyling({ ext, name }) {
  return {
    module: {
      rules: [buildCSSLoaders({ ext, name, useStyle: true })],
    },
  }
}
