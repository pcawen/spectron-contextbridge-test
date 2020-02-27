const Application = require('spectron').Application;
const path = require('path');

var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');

if (process.platform === 'win32') {
    electronPath += '.cmd';
}

var appPath = path.join(__dirname, '..');

var app = new Application({
            path: electronPath,
            args: [appPath]
        });

describe('Test Example', function () {
  beforeAll(function () {
      return app.start();
  });

  afterAll(function () {
      return app.stop();
  });

  it('opens a window', function () {
    expect.assertions(1);
    return app.client.waitUntilWindowLoaded().getWindowCount().then(function (count) {
        console.log('count', count)
        expect(count).toEqual(2);
    })
  });

  it('tests the title', function () {
    expect.assertions(1);
    return app.client.waitUntilWindowLoaded().browserWindow.getTitle().then(function (t) {
      console.log('title', t)
      expect(t).toEqual('Hello World!');
    })
  });
});
