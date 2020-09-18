"use strict";
// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogComponent = void 0;
const keys_1 = require("./keys");
const providers_1 = require("./providers");
class LogComponent {
    constructor() {
        this.providers = {
            [keys_1.EXAMPLE_LOG_BINDINGS.TIMER.key]: providers_1.TimerProvider,
            [keys_1.EXAMPLE_LOG_BINDINGS.LOG_ACTION.key]: providers_1.LogActionProvider,
        };
    }
}
exports.LogComponent = LogComponent;
//# sourceMappingURL=component.js.map