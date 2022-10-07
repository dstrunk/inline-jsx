let mix = require('laravel-mix')

mix.js('src/js/app.js', 'dist/js')
  .css('src/css/app.css', 'dist/css')
  .react()
  .setPublicPath('public')
  .webpackConfig({
    devServer: {
      compress: true,
      hot: true,
      host: 'localhost',
      port: 3000,
    }
  })
