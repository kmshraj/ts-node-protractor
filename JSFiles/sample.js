"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
describe('Navigate to Accepted Message - Search by All', () => {
    beforeAll(() => { });
    it('As a user I am searching using All & Past 24h', () => {
        protractor_1.browser.getCurrentUrl();
        protractor_1.browser.refresh();
        console.log('done');
    });
});
//# sourceMappingURL=sample.js.map