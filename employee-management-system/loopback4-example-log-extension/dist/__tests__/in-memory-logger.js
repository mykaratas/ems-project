"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetLogs = exports.logToMemory = exports.inMemLog = exports.InMemoryLog = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const __1 = require("../");
class InMemoryLog {
    constructor() {
        this.entries = [];
    }
    add(msg) {
        if (msg)
            this.entries.push(msg);
    }
    reset() {
        this.entries = [];
    }
}
exports.InMemoryLog = InMemoryLog;
exports.inMemLog = new InMemoryLog();
function logToMemory(msg, level) {
    let output;
    switch (level) {
        case __1.LOG_LEVEL.DEBUG:
            output = chalk_1.default.white(`DEBUG: ${msg}`);
            break;
        case __1.LOG_LEVEL.INFO:
            output = chalk_1.default.green(`INFO: ${msg}`);
            break;
        case __1.LOG_LEVEL.WARN:
            output = chalk_1.default.yellow(`WARN: ${msg}`);
            break;
        case __1.LOG_LEVEL.ERROR:
            output = chalk_1.default.red(`ERROR: ${msg}`);
            break;
    }
    exports.inMemLog.add(output);
}
exports.logToMemory = logToMemory;
function resetLogs() {
    exports.inMemLog.reset();
}
exports.resetLogs = resetLogs;
//# sourceMappingURL=in-memory-logger.js.map