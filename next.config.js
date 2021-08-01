const withLess = require('@zeit/next-less');
const withWorkers = require('@zeit/next-workers')

module.exports = withLess(withWorkers({
    lessLoaderOptions: {
        javascriptEnabled: true,
    },
    webpack(config, options) {
        return config
      }
}));
