import BrowserSync from 'browser-sync';

export default class {
  /**
   * @constructor
   * @param {string} name Create a named BrowserSync instance.
   * @param {object} proxy Proxy to another server.
   */
  constructor(name, proxy) {
    if (BrowserSync.has(name)) {
      this.bs = BrowserSync.get(name);
    } else {
      this.bs = BrowserSync.create(name);
    }
    this.proxy = proxy;

    this.reload = this.bs.reload;
    this.watch = this.bs.watch;
  }

  init() {
    this.bs.init({
      proxy: {
        /**
         * This is the default for firebase.
         */
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
    });
  }

  start() {
    this.proxy.start();

    // Give proxy time to start
    const bs = this;
    setTimeout(() => { bs.init(); }, 3000);

    return this;
  }
}
