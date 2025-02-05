const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const option = {
	entry: {
		main: './src/main.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle-[name]-[fullhash:8].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: '主页',
			template: './src/index.html',
			filename: 'index.html',
			inject: 'head',
			chunks: ['main']
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		})
	],
	module: {
		rules: [
			{
				test:/\.css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '',
						},
					},
					"css-loader"
				],
			},
			{
				test: /\.less$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
					'less-loader',
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				exclude: /node_modules/,
				type: 'javascript/auto',
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							esModule: false,
							name: './images/[name]_[hash].[ext]',
						},
					},
				],
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
				options: {
					esModule: false,
				}
			},
		]
	},
	performance: {
		hints: 'warning',
		maxEntrypointSize:50000000,
		maxAssetSize: 30000000,
		assetFilter: function (assetFilename) {
			return assetFilename.endsWith('.js');
		}
	},
}
module.exports = option