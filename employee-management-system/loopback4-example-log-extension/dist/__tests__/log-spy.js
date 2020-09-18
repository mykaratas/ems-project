"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConsoleStub = exports.restoreLogSpy = exports.createLogSpy = void 0;
const testlab_1 = require("@loopback/testlab");
const in_memory_logger_1 = require("./in-memory-logger");
function createLogSpy() {
    return testlab_1.sinon.spy(in_memory_logger_1.InMemoryLog.prototype, 'add');
}
exports.createLogSpy = createLogSpy;
function restoreLogSpy(spy) {
    spy.restore();
}
exports.restoreLogSpy = restoreLogSpy;
function createConsoleStub() {
    return testlab_1.sinon.stub(console, 'log');
}
exports.createConsoleStub = createConsoleStub;
//# sourceMappingURL=log-spy.js.map