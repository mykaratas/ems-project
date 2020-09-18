"use strict";
// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogMetadata = exports.log = void 0;
const keys_1 = require("../keys");
const core_1 = require("@loopback/core");
/**
 * Mark a controller method as requiring logging (input, output & timing)
 * if it is set at or greater than Application LogLevel.
 * LOG_LEVEL.DEBUG < LOG_LEVEL.INFO < LOG_LEVEL.WARN < LOG_LEVEL.ERROR < LOG_LEVEL.OFF
 *
 * @param level - The Log Level at or above it should log
 */
function log(level) {
    if (level === undefined)
        level = keys_1.LOG_LEVEL.WARN;
    return core_1.MethodDecoratorFactory.createDecorator(keys_1.EXAMPLE_LOG_METADATA_KEY, {
        level,
    });
}
exports.log = log;
/**
 * Fetch log level stored by `@log` decorator.
 *
 * @param controllerClass - Target controller
 * @param methodName - Target method
 */
function getLogMetadata(controllerClass, methodName) {
    var _a;
    return ((_a = core_1.MetadataInspector.getMethodMetadata(keys_1.EXAMPLE_LOG_METADATA_KEY, controllerClass.prototype, methodName)) !== null && _a !== void 0 ? _a : { level: keys_1.LOG_LEVEL.OFF });
}
exports.getLogMetadata = getLogMetadata;
//# sourceMappingURL=log.decorator.js.map