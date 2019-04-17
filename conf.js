let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
let path = require('path');
let fs = require('fs');

function rmDir(dirPath) {
  let files;
  try {
    files = fs.readdirSync(dirPath);
  } catch (e) {
    return;
  }

  if (files.length > 0) {
    for (const file of files) {
      const filePath = dirPath + '/' + file;
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      } else {
        rmDir(filePath);
      }
    }
  }
  fs.rmdirSync(dirPath);
}

let config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'https://login-qan.mimecast.com/u/login/?gta=administration#/login',
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--disable-infobars'],
      // // args: ['--headless']
      prefs: {
        download: {
          prompt_for_download: false,
          default_directory: process.cwd() + '/downloads/',
          default_content_settings: {
            popups: 0
          }
        }
      }
    },
    exclude: []
  },
  framework: 'jasmine',
  directConnect: true,
  specs: ['e2e/specs/sample.ts'],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 200000,
    showColors: true
  },
  // noGlobals: true,

  onPrepare: () => {
    const dir = process.cwd() + '/downloads/';
    rmDir(dir);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const globals = require('protractor');
    const browser = globals.browser;
    browser
      .manage()
      .window()
      .maximize();
    browser
      .manage()
      .timeouts()
      .implicitlyWait(10000);
    const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
    const JasmineReporters = require('jasmine-reporters');

    require('ts-node').register({
      project: 'tsconfig.json'
    });
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: 'TResults',
        screenshotsFolder: 'images',
        fileNameDateSuffix: true,
        cleanDestination: true,
        takeScreenshots: true,
        takeScreenshotsOnlyOnFailures: true,
        consolidate: true,
        consolidateAll: true
      })
    );
    jasmine.getEnv().addReporter(
      new JasmineReporters.JUnitXmlReporter({
        // JUnit
        savePath: 'TResults/junit',
        consolidateAll: false
      })
    );
  },

  afterLaunch: exitCode => {
    console.log('exit code is' + exitCode);
  },

  suites: {}
};

exports.config = config;
