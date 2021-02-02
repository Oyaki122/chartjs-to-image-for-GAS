import {stringify} from 'javascript-stringify'

class ChartJsImage4Gas {
  constructor(apiKey, accountId) {
    this.apiKey = apiKey;
    this.accountId = accountId;

    this.host = 'quickchart.io';
    this.protocol = 'https';
    this.baseUrl = `${this.protocol}://${this.host}`;

    this.chart = undefined;
    this.width = 500;
    this.height = 300;
    this.devicePixelRatio = 1.0;
    this.backgroundColor = '#ffffff';
    this.format = 'png';
  }

  setConfig(chartConfig) {
    this.chart = stringify(chartConfig);
    return this;
  }

  setWidth(width) {
    this.width = parseInt(width, 10);
    return this;
  }

  setHeight(height) {
    this.height = parseInt(height, 10);
    return this;
  }

  setBackgroundColor(color) {
    this.backgroundColor = color;
    return this;
  }

  setDevicePixelRatio(ratio) {
    this.devicePixelRatio = parseFloat(ratio);
    return this;
  }

  setFormat(fmt) {
    this.format = fmt;
    return this;
  }

  isValid() {
    if (!this.chart) {
      return false;
    }
    return true;
  }

  getUrl() {
    if (!this.isValid()) {
      throw new Error('You must call setConfig before getUrl');
    }
    const url = `${this.baseUrl}/chart?`
    url += `c=${encodeURIComponent(this.chart)}&`
    url += `w=${String(this.width)}&`
    url += `h=${String(this.height)}`

    if (this.devicePixelRatio !== 1.0) {
      url += `&devicePixelRatio=${String(this.devicePixelRatio)}`
    }
    if (this.backgroundColor !== 1.0) {
      url += `&bkg=${String(this.backgroundColor)}`
    }
    if (this.format !== 1.0) {
      url += `&f=${String(this.format)}`
    }

    return url
  }
}

export default ChartJsImage4Gas