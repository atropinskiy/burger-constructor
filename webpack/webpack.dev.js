const path = require('path'); //для того чтобы превратить отнсительный путь в абсолютный мы будем использовать пакет path
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
    historyApiFallback: {
      index: '/burger-constructor/',  // Указываем правильный подкаталог для работы с React Router
    },
		static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
		// compress: true, // это ускорит загрузку в режиме разработки
		port: 3000, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
		open: '/burger-constructor/', // сайт будет открываться сам при запуске npm run dev
		hot: true,
	},
	output: {
    publicPath: '/burger-constructor/', // Указание на подкаталог
  },
	plugins: [new ReactRefreshWebpackPlugin()], //123
};
