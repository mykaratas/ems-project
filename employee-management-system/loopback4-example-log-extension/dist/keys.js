"use strict";
// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_LEVEL = exports.EXAMPLE_LOG_METADATA_KEY = exports.EXAMPLE_LOG_BINDINGS = void 0;
const core_1 = require("@loopback/core");
/**
 * Binding keys used by this component.
 */
var EXAMPLE_LOG_BINDINGS;
(function (EXAMPLE_LOG_BINDINGS) {
    EXAMPLE_LOG_BINDINGS.APP_LOG_LEVEL = core_1.BindingKey.create('example.log.level');
    EXAMPLE_LOG_BINDINGS.TIMER = core_1.BindingKey.create('example.log.timer');
    EXAMPLE_LOG_BINDINGS.LOGGER = core_1.BindingKey.create('example.log.logger');
    EXAMPLE_LOG_BINDINGS.LOG_ACTION = core_1.BindingKey.create('example.log.action');
})(EXAMPLE_LOG_BINDINGS = exports.EXAMPLE_LOG_BINDINGS || (exports.EXAMPLE_LOG_BINDINGS = {}));
/**
 * The key used to store log-related metadata via decorators and reflection.
 */
exports.EXAMPLE_LOG_METADATA_KEY = 'example.log.metadata';
/**
 * Enum to define the supported log levels
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var LOG_LEVEL;
(function (LOG_LEVEL) {
    LOG_LEVEL[LOG_LEVEL["DEBUG"] = 0] = "DEBUG";
    LOG_LEVEL[LOG_LEVEL["INFO"] = 1] = "INFO";
    LOG_LEVEL[LOG_LEVEL["WARN"] = 2] = "WARN";
    LOG_LEVEL[LOG_LEVEL["ERROR"] = 3] = "ERROR";
    LOG_LEVEL[LOG_LEVEL["OFF"] = 4] = "OFF";
})(LOG_LEVEL = exports.LOG_LEVEL || (exports.LOG_LEVEL = {}));
//# sourceMappingURL=keys.js.map