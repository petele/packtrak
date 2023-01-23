
class ConsoleLogger {
  constructor() {
    const isProd = process.env.NODE_ENV === 'production';
    if (isProd) {
      this.log = this._noop;
      this.warn = this._noop;
      this.error = this._noop;
      return;
    }
    this.log = console.log.bind(console);
    this.warn = console.warn.bind(console);
    this.error = console.error.bind(console);
  }

  _noop() {
    return;
  }
}

export const logger = new ConsoleLogger();
