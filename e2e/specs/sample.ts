import { browser } from 'protractor';

describe('Navigate to Accepted Message - Search by All', () => {
  beforeAll(() => {});

  it('As a user I am searching using All & Past 24h', () => {
    browser.driver.get('https://login-qan.mimecast.com/u/login/?gta=supervision#/login');
    browser.getCurrentUrl();
    browser.refresh();
    console.log('done');
  });
});
