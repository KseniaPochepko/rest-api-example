const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@core': path.resolve(__dirname, './src')
    }
  }
}
