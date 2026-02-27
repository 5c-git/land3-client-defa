// === SUPPRESS SASS "mixed-decls" WARNINGS ===
const originalStderrWrite = process.stderr.write;

process.stderr.write = function (chunk, encoding, callback) {
  const msg = chunk.toString();

  // Подавляем ворнинги Sass
  if (
    // Подавляем ворнинги про "mixed-decls"
    msg.includes('[mixed-decls]') ||
    msg.includes('sass-lang.com/d/mixed-decls') ||
    msg.includes('Sass\'s behavior for declarations that appear after nested rules will be changing') ||
    msg.includes('repetitive deprecation warnings omitted') ||

    // Подавляем legacy JS API warning
    msg.includes('The legacy JS API is deprecated and will be removed in Dart Sass') ||
    msg.includes('sass-lang.com/d/legacy-js-api')
  ) {
    return true;
  }

  return originalStderrWrite.apply(process.stderr, arguments);
};
// === END SUPPRESSION ===

const path = require('path');
const glob = require('glob');
const os = require('os');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pugDependencies = [
  ...glob.sync(path.resolve(__dirname, 'src/components/**/*.pug')),
  ...glob.sync(path.resolve(__dirname, 'src/components/**/*.js')),
  ...glob.sync(path.resolve(__dirname, 'src/components/**/*.scss')),
];

const isProduction = process.env.NODE_ENV === 'production';
const devStyleLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

// Автоматический HtmlWebpackPlugin для всех .pug в src/pages
const pages = glob.sync('./src/pages/**/*.pug');

const htmlPlugins = pages.map((file) => {
  const filename = path.basename(file, '.pug') + '.html';
  return new HtmlWebpackPlugin({
    filename,
    template: file,
    inject: 'body',
    minify: false, // ← вот это отключает минификацию
  });
});

module.exports = {
  entry: {
    urlapp: `./src/urlapp.js`,
    bundle: `./src/index.js`,
    common: `./src/common.js`,
    // specificPage: `./src/specificPage.js`,
  },
  output: {
    path: isProduction ? path.resolve(__dirname, 'build') : undefined,
    filename: 'js/[name].js', // будет build/js/bundle.js и vendors.js
    assetModuleFilename: 'assets/[name][ext][query]',
    clean: isProduction,
  },
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: `vendors`,
          test: /node_modules/,
          chunks: `all`,
          enforce: true,
        },
      },
    },
  },
  cache: {
    type: 'filesystem',
    compression: 'brotli', // можно 'gzip' или 'brotli' для ещё быстрее
    allowCollectingMemory: true,
    buildDependencies: {
      config: [__filename], // следит за изменением конфига
      pug: pugDependencies, // массив файлов .pug из папки компонентов
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'js',
          target: 'es2017',
        },
        exclude: [
          /node_modules/,
          path.resolve(__dirname, 'src/common.js'),
          path.resolve(__dirname, 'src/urlapp.js'),
        ],
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: os.cpus().length - 1,
            },
          },
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
              cache: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          devStyleLoader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
              },
              url: false,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              additionalData: `@use "utils/utils.scss" as *;`,
              sassOptions: {
                outputStyle: 'expanded',  // Заставляет Sass генерировать более читабельный, развернутый CSS без минификации.
                includePaths: [path.resolve(__dirname, 'src')],
                quietDeps: true, // ✅ глушим зависимости
                logger: {
                  warn(message, options) {
                    if (
                      typeof message === 'string' &&
                      message.includes('[mixed-decls]')
                    ) {
                      return; // 💥 подавляем только конкретный ворнинг
                    }

                    // Все остальные ворнинги — оставляем
                    console.warn(message);
                  }
                }
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          devStyleLoader,
          {
            loader: 'css-loader',
            options: {
              modules: { auto: true },
              url: false,
              sourceMap: true,
            },
          },
        ],
      },
      // { // Это новая фишка WP5 но мне не подошла из-за Pug.
      //   test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/i,
      //   type: 'asset/resource',
      //   exclude: path.resolve(__dirname, 'src/assets/icons'), // исключаем svg из папки icons
      //   generator: {
      //     filename: (pathData) => {
      //       // pathData.filename — полный путь исходного файла
      //       // Нужно получить путь относительно src/assets и использовать его

      //       // например: src/assets/images/photo.png -> images/photo.png

      //       const relativePath = path.relative(path.resolve(__dirname, 'src/assets'), pathData.filename);
      //       return `assets/${relativePath}`;
      //     }
      //   },
      // },
      {
        test: /\.svg$/i,
        include: path.resolve(__dirname, 'src/assets/icons'), // путь к папке с иконками
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: false,       // НЕ выносить спрайт в отдельный файл — вставлять inline
              runtimeCompat: true,  // поддержка IE (если нужно)
              // extract: true, // Вынести в отдельный файл
              // spriteFilename: 'sprite.svg', // имя файла спрайта
            }
          },
          // 'svgo-loader' // опционально, оптимизация SVG
        ]
      },
    ],
  },
  plugins: [
    ...htmlPlugins,
    new SpriteLoaderPlugin({
      plainSprite: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {  // Копирование файлов без обработки сборщика.
          from: path.resolve(__dirname, 'src/common.js'),
          to: path.resolve(__dirname, 'build/js/common.js'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/'),
          to: 'assets/',
          globOptions: {
            ignore: ['**/icons/**'], // исключаем всю папку icons
          },
          noErrorOnMissing: true,
        },
        {
          from: `./src/libsJQ`,
          to: `libsJQ/`
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'src'),
      watch: true,
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    host: '0.0.0.0',           // 🔹 слушаем все интерфейсы
    allowedHosts: 'all',       // 🔹 разрешаем доступ с других устройств
    client: {
      overlay: false, // не тормозит на ошибках
    },
    watchFiles: ['src/**/*.pug'],
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  stats: {
    warnings: false,
    children: true,
    errorDetails: true,
    modules: false,
    entrypoints: false,
    chunks: false,
    assets: false,
    builtAt: false,
    version: false,
  },
  mode: isProduction ? 'production' : 'development',
};
