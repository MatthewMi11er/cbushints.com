module.exports = {
  proxy: {
    target: 'http://localhost:5000',
    proxyRes: [
      (proxyRes) => {
        /**
         * This header interferes with browser-sync
         * so remove it for dev.
         */
        const headers = proxyRes.headers;
        delete headers['content-security-policy'];
      },
    ],
  },
  files: 'dist/',
};
