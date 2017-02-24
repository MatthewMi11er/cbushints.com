import { create as bsCreate, has as bsHas, get as bsGet } from 'browser-sync';

export default class {
  constructor(name, proxy) {
    if (bsHas(name)) {
      this.bs = bsGet(name);
    } else {
      this.bs = bsCreate(name);
    }
    this.proxy = proxy;
  }
  start() {
    this.proxy.start();

    // Give proxy time to start
    setTimeout(() => {
      this.bs.init({
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
      });
    }, 3000);
  }
  watch(build) {
    const reload = this.bs.reload;
    this.bs.watch('src/').on('change', () => {
      build(reload);
    });
    this.bs.watch('./firebase.json').on('change', () => {
      this.proxy.restart();
    });
  }
  reload() {
    this.bs.reload();
  }
}
