"use strict";
// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerProvider = void 0;
class TimerProvider {
    constructor() { }
    value() {
        return (start) => {
            if (!start)
                return process.hrtime();
            return process.hrtime(start);
        };
    }
}
exports.TimerProvider = TimerProvider;
//# sourceMappingURL=timer.provider.js.map