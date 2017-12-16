module.exports = {
  entry: ['./app/index.js'],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              ['env', { modules: false }],
              'react'
            ],
            plugins: ['transform-runtime']
          }
        }
      }
    ]
  },
  devtool: 'source-maps',
  devServer: {
    port: 3000,
    inline: true,
    contentBase: __dirname
  }
};
