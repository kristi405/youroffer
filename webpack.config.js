const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // config.module.rules.push({
  //   test: /\.js$/,
  //   use: {
  //     loader: 'babel-loader',
  //     options: {
  //       plugins: ['transform-commonjs']
  //     }
  //   }
  // })  
  return config;
};
