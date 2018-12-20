module.exports = {
  baseUrl:
    process.env.NODE_ENV === 'production'
      ? '/wonderKnow_statistics_refactoring/'
      : '/',
  outputDir: 'docs'
  // chainWebpack: config => {
  //   // GraphQL Loader
  //   config.module
  //     .rule('babel')
  //     .test(/\.m?js$/)
  //     .use('babel-loader')
  //       .loader('babel-loader')
  //       .end()
  // }
}
