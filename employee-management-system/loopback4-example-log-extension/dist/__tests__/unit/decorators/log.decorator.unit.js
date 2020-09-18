"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testlab_1 = require("@loopback/testlab");
const __1 = require("../../..");
describe('@log() decorator (unit)', () => {
    it('sets log level for method to given value', () => {
        class TestClass {
            test() { }
        }
        tslib_1.__decorate([
            __1.log(__1.LOG_LEVEL.ERROR),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestClass.prototype, "test", null);
        const level = __1.getLogMetadata(TestClass, 'test');
        testlab_1.expect(level.level).to.be.eql(__1.LOG_LEVEL.ERROR);
    });
    it('sets log level for method to default', () => {
        class TestClass {
            test() { }
        }
        tslib_1.__decorate([
            __1.log(),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestClass.prototype, "test", null);
        const level = __1.getLogMetadata(TestClass, 'test');
        testlab_1.expect(level.level).to.be.eql(__1.LOG_LEVEL.WARN);
    });
});
//# sourceMappingURL=log.decorator.unit.js.map