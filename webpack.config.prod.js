const option = require('./webpack.config.common');
const merge = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const prodConfig = {
	mode: 'production',
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {
						drop_console: true,
					}
				}
			}),
			new CssMinimizerPlugin()
		]
	}
}
module.exports = merge(option, prodConfig);