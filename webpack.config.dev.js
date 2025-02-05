const option = require('./webpack.config.common');
const { merge } = require('webpack-merge');
const path = require('path');

const devConfig = {
	mode:'development',
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		compress: true,
		port: 8080,
		open:true,
		proxy: [
			{
				target: 'https://test.com',
				context: ['/', '/api'],
				secure: false,
				changeOrigin: true,
			}
		]
	},
}
module.exports = merge(option, devConfig);