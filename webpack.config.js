const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')

require('@babel/polyfill')

// module.exports = {
//   //진입점
//   entry: {
//     app: [
//       '@babel/polyfill',
//       path.join(__dirname, 'main.js')
//     ]
//   },
//   //결과물에 대한 설정
//   output: {
//     filename: '[name].js', // app.js
//     path: path.join(__dirname, 'dist')
//   },
//   module: {
//     rules: [
//       {
//         test: /\.vue$/,
//         loader: 'vue-loader'
//       },
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader'
//       },
//       {
//         test: /\.css$/,
//         use: [
//           'vue-style-loader',
//           'css-loader'
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new VueLoaderPlugin(),
//     new HtmlWebpackPlugin({
//       template: path.join(__dirname, 'index.html')
//     }),
//     new CopyWebpackPlugin({

//       patterns: [
//         {
//          from: './assets/',
//          to: ''
//        }
//       ]
//     }),
//     // new CleanWebpackPlugin()

//   ],
//   // devServer: {
//   //   open: false,
//   //   hot: true
//   // },
// }

module.exports = (env, opts) => {
  const config = {
    // 확장자 생략가능하도록
    resolve: {
      extensions: [ '.vue', '.js' ]
    },
    // 진입점
    entry: {
      app: [
        '@babel/polyfill',
        path.join(__dirname, 'main.js')
      ]
    },
    // 결과물에 대한 설정
    output: {
      filename: '[name].js', // app.js
      path: path.join(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html')
      }),
      new CopyWebpackPlugin({

        patterns: [
          {
            from: './assets/',
            to: ''
          }
        ]
      })
    ]
  }
  //  console.log(opts)
  if (opts.mode === 'development') {
    return merge(config, {
      // 추가 개발용 옵션
      devServer: {
        open: false,
        hot: true
      },
      devtool: 'eval' // webpack 돌아갈 때 빌드시간은 최소화하고 디버그 내용을 최대화. 개발용일 때 사용
    })
  }
  if (opts.mode === 'production') {
    return merge(config, {
      devtool: 'cheap-module-source-map',
      plugins: [
        new CleanWebpackPlugin()
      ]
    })
  }
}
