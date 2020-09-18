"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogActionProvider = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const decorators_1 = require("../decorators");
const keys_1 = require("../keys");
let LogActionProvider = class LogActionProvider {
    constructor(getController, getMethod, timer) {
        this.getController = getController;
        this.getMethod = getMethod;
        this.timer = timer;
        // LogWriteFn is an optional dependency and it falls back to `logToConsole`
        this.writeLog = logToConsole;
        this.logLevel = keys_1.LOG_LEVEL.WARN;
    }
    value() {
        const fn = ((req, args, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result, start) => {
            return this.action(req, args, result, start);
        });
        fn.startTimer = () => {
            return this.timer();
        };
        return fn;
    }
    async action(req, args, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result, start) {
        const controllerClass = await this.getController();
        const methodName = await this.getMethod();
        const metadata = decorators_1.getLogMetadata(controllerClass, methodName);
        const level = metadata ? metadata.level : undefined;
        if (level !== undefined &&
            this.logLevel !== keys_1.LOG_LEVEL.OFF &&
            level >= this.logLevel &&
            level !== keys_1.LOG_LEVEL.OFF) {
            if (!args)
                args = [];
            let msg = `${req.url} :: ${controllerClass.name}.`;
            msg += `${methodName}(${args.join(', ')}) => `;
            if (typeof result === 'object')
                msg += JSON.stringify(result);
            else
                msg += result;
            if (start) {
                const timeDiff = this.timer(start);
                const time = timeDiff[0] * 1000 + Math.round(timeDiff[1] * 1e-4) / 100;
                msg = `${time}ms: ${msg}`;
            }
            this.writeLog(msg, level);
        }
    }
};
tslib_1.__decorate([
    core_1.inject(keys_1.EXAMPLE_LOG_BINDINGS.LOGGER, { optional: true }),
    tslib_1.__metadata("design:type", Function)
], LogActionProvider.prototype, "writeLog", void 0);
tslib_1.__decorate([
    core_1.inject(keys_1.EXAMPLE_LOG_BINDINGS.APP_LOG_LEVEL, { optional: true }),
    tslib_1.__metadata("design:type", Number)
], LogActionProvider.prototype, "logLevel", void 0);
LogActionProvider = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject.getter(core_1.CoreBindings.CONTROLLER_CLASS)),
    tslib_1.__param(1, core_1.inject.getter(core_1.CoreBindings.CONTROLLER_METHOD_NAME)),
    tslib_1.__param(2, core_1.inject(keys_1.EXAMPLE_LOG_BINDINGS.TIMER)),
    tslib_1.__metadata("design:paramtypes", [Function, Function, Function])
], LogActionProvider);
exports.LogActionProvider = LogActionProvider;
function logToConsole(msg, level) {
    let output;
    switch (level) {
        case keys_1.LOG_LEVEL.DEBUG:
            output = chalk_1.default.white(`DEBUG: ${msg}`);
            break;
        case keys_1.LOG_LEVEL.INFO:
            output = chalk_1.default.green(`INFO: ${msg}`);
            break;
        case keys_1.LOG_LEVEL.WARN:
            output = chalk_1.default.yellow(`WARN: ${msg}`);
            break;
        case keys_1.LOG_LEVEL.ERROR:
            output = chalk_1.default.red(`ERROR: ${msg}`);
            break;
    }
    if (output)
        console.log(output);
}
//# sourceMappingURL=log-action.provider.js.map