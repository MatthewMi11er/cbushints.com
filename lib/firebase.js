import { spawn, ChildProcess } from 'child_process';

export default class {
  constructor() {
    this.firebase = null;
    process.on('exit', () => { this.stop(); });
  }
  start() {
    if (!(this.firebase instanceof ChildProcess)) {
      this.firebase = spawn('firebase', ['serve'], { stdio: 'inherit' });
    }
    return this;
  }
  restart() {
    this.stop();
    this.start();
    return this;
  }
  stop() {
    if (this.firebase instanceof ChildProcess) {
      this.firebase.kill();
    }
    return this;
  }
}
