"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const __1 = require("../../..");
describe('TimerProvider (unit)', () => {
    it('returns current time given no start time', () => {
        const timer = new __1.TimerProvider().value();
        const time = timer();
        testlab_1.expect(time).to.have.lengthOf(2);
        testlab_1.expect(time[0]).to.be.a.Number();
        testlab_1.expect(time[1]).to.be.a.Number();
    });
    it('returns the time difference given a time', () => {
        const timer = new __1.TimerProvider().value();
        const diff = timer([2, 2]);
        testlab_1.expect(diff).to.have.lengthOf(2);
        testlab_1.expect(diff[0]).to.be.a.Number();
        testlab_1.expect(diff[1]).to.be.a.Number();
    });
});
//# sourceMappingURL=timer.provider.unit.js.map