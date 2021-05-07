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
    let url = `${this.baseUrl}/chart?`
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

  getPostData() {
    const { width, height, chart, format, backgroundColor, devicePixelRatio } = this;
    const postData = {
      width,
      height,
      chart,
    };
    if (format) {
      postData.format = format;
    }
    if (backgroundColor) {
      postData.backgroundColor = backgroundColor;
    }
    if (devicePixelRatio) {
      postData.devicePixelRatio = devicePixelRatio;
    }
    return postData;
  }

  getShortUrl() {
    if (!this.isValid()) {
      throw new Error('You must call setConfig before getUrl');
    }

    const resp = UrlFetchApp.fetch('https://quickchart.io/chart/create', {
      method: 'post',
      payload: JSON.stringify(this.getPostData()),
      contentType: 'application/json'
    });
    console.log(resp)
    if (resp.getResponseCode() !== 200) {
      throw `Bad response code ${resp.status} from chart shorturl endpoint`;
    } 
    const res =  JSON.parse(resp.getContentText())
    if (!res.success) throw 'Received failure response from chart shorturl endpoint'

    return res.url
  }
}

export default ChartJsImage4Gas