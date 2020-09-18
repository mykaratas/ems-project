"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testlab_1 = require("@loopback/testlab");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const __1 = require("../../..");
const in_memory_logger_1 = require("../../in-memory-logger");
const log_spy_1 = require("../../log-spy");
describe('LogActionProvider with in-memory logger', () => {
    let spy;
    let logger;
    const req = { url: '/test' };
    beforeEach(() => {
        spy = log_spy_1.createLogSpy();
    });
    beforeEach(async () => (logger = await getLogger(in_memory_logger_1.logToMemory)));
    afterEach(() => log_spy_1.restoreLogSpy(spy));
    it('logs a value without a start time', async () => {
        const match = chalk_1.default.red('ERROR: /test :: TestClass.test() => test message');
        await logger(req, [], 'test message');
        testlab_1.sinon.assert.calledWith(spy, match);
    });
    it('logs a value with a start time', async () => {
        const match = chalk_1.default.red('ERROR: 100ms: /test :: TestClass.test() => test message');
        const startTime = logger.startTimer();
        await logger(req, [], 'test message', startTime);
        testlab_1.sinon.assert.calledWith(spy, match);
    });
    it('logs a value with args present', async () => {
        const match = chalk_1.default.red('ERROR: /test :: TestClass.test(test, message) => test message');
        await logger(req, ['test', 'message'], 'test message');
        testlab_1.sinon.assert.calledWith(spy, match);
    });
});
describe('LogActionProvider with default logger', () => {
    let stub;
    let logger;
    const req = { url: '/test' };
    beforeEach(() => {
        stub = log_spy_1.createConsoleStub();
    });
    beforeEach(async () => (logger = await getLogger()));
    afterEach(() => log_spy_1.restoreLogSpy(stub));
    it('logs a value without a start time', async () => {
        const match = chalk_1.default.red('ERROR: /test :: TestClass.test() => test message');
        await logger(req, [], 'test message');
        testlab_1.sinon.assert.calledWith(stub, match);
    });
    it('logs a value with a start time', async () => {
        const match = chalk_1.default.red('ERROR: 100ms: /test :: TestClass.test() => test message');
        const startTime = logger.startTimer();
        await logger(req, [], 'test message', startTime);
        testlab_1.sinon.assert.calledWith(stub, match);
    });
    it('logs a value with args present', async () => {
        const match = chalk_1.default.red('ERROR: /test :: TestClass.test(test, message) => test message');
        await logger(req, ['test', 'message'], 'test message');
        testlab_1.sinon.assert.calledWith(stub, match);
    });
});
async function getLogger(logWriter) {
    class TestClass {
        test() { }
    }
    tslib_1.__decorate([
        __1.log(__1.LOG_LEVEL.ERROR),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TestClass.prototype, "test", null);
    const provider = new __1.LogActionProvider(() => Promise.resolve(TestClass), () => Promise.resolve('test'), timer);
    if (logWriter)
        provider.writeLog = logWriter;
    return provider.value();
}
function timer(startTime) {
    if (!startTime)
        return [3, 3];
    else
        return [0, 100000002];
}
//# sourceMappingURL=log-action.provider.unit.js.map