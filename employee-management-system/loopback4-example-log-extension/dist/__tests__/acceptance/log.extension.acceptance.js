"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const testlab_1 = require("@loopback/testlab");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const __1 = require("../..");
const in_memory_logger_1 = require("../in-memory-logger");
const log_spy_1 = require("../log-spy");
const SequenceActions = rest_1.RestBindings.SequenceActions;
describe('log extension acceptance test', () => {
    let app;
    let spy;
    class LogApp extends __1.LogMixin(rest_1.RestApplication) {
    }
    const debugMatch = chalk_1.default.white('DEBUG: /debug :: MyController.debug() => debug called');
    const infoMatch = chalk_1.default.green('INFO: /info :: MyController.info() => info called');
    const warnMatch = chalk_1.default.yellow('WARN: /warn :: MyController.warn() => warn called');
    const errorMatch = chalk_1.default.red('ERROR: /error :: MyController.error() => error called');
    const nameMatch = chalk_1.default.yellow('WARN: /?name=test :: MyController.hello(test) => hello test');
    beforeEach(createApp);
    beforeEach(createController);
    beforeEach(createSequence);
    beforeEach(in_memory_logger_1.resetLogs);
    beforeEach(() => {
        spy = log_spy_1.createLogSpy();
    });
    afterEach(() => log_spy_1.restoreLogSpy(spy));
    it('logs information at DEBUG or higher', async () => {
        setAppLogToDebug();
        const client = testlab_1.createClientForHandler(app.requestHandler);
        await client.get('/nolog').expect(200, 'nolog called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/off').expect(200, 'off called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/debug').expect(200, 'debug called');
        testlab_1.sinon.assert.calledWith(spy, debugMatch);
        await client.get('/info').expect(200, 'info called');
        testlab_1.sinon.assert.calledWith(spy, infoMatch);
        await client.get('/warn').expect(200, 'warn called');
        testlab_1.sinon.assert.calledWith(spy, warnMatch);
        await client.get('/error').expect(200, 'error called');
        testlab_1.sinon.assert.calledWith(spy, errorMatch);
        await client.get('/?name=test').expect(200, 'hello test');
        testlab_1.sinon.assert.calledWith(spy, nameMatch);
    });
    it('logs information at INFO or higher', async () => {
        setAppLogToInfo();
        const client = testlab_1.createClientForHandler(app.requestHandler);
        await client.get('/nolog').expect(200, 'nolog called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/off').expect(200, 'off called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/debug').expect(200, 'debug called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/info').expect(200, 'info called');
        testlab_1.sinon.assert.calledWith(spy, infoMatch);
        await client.get('/warn').expect(200, 'warn called');
        testlab_1.sinon.assert.calledWith(spy, warnMatch);
        await client.get('/error').expect(200, 'error called');
        testlab_1.sinon.assert.calledWith(spy, errorMatch);
        await client.get('/?name=test').expect(200, 'hello test');
        testlab_1.sinon.assert.calledWith(spy, nameMatch);
    });
    it('logs information at WARN or higher', async () => {
        setAppLogToWarn();
        const client = testlab_1.createClientForHandler(app.requestHandler);
        await client.get('/nolog').expect(200, 'nolog called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/off').expect(200, 'off called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/debug').expect(200, 'debug called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/info').expect(200, 'info called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/warn').expect(200, 'warn called');
        testlab_1.sinon.assert.calledWith(spy, warnMatch);
        await client.get('/error').expect(200, 'error called');
        testlab_1.sinon.assert.calledWith(spy, errorMatch);
        await client.get('/?name=test').expect(200, 'hello test');
        testlab_1.sinon.assert.calledWith(spy, nameMatch);
    });
    it('logs information at ERROR', async () => {
        setAppLogToError();
        const client = testlab_1.createClientForHandler(app.requestHandler);
        await client.get('/nolog').expect(200, 'nolog called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/off').expect(200, 'off called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/debug').expect(200, 'debug called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/info').expect(200, 'info called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/warn').expect(200, 'warn called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/?name=test').expect(200, 'hello test');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/error').expect(200, 'error called');
        testlab_1.sinon.assert.calledWith(spy, errorMatch);
    });
    it('logs no information when logLevel is set to OFF', async () => {
        setAppLogToOff();
        const client = testlab_1.createClientForHandler(app.requestHandler);
        await client.get('/nolog').expect(200, 'nolog called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/off').expect(200, 'off called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/debug').expect(200, 'debug called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/info').expect(200, 'info called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/warn').expect(200, 'warn called');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/?name=test').expect(200, 'hello test');
        testlab_1.expect(spy.called).to.be.False();
        await client.get('/error').expect(200, 'error called');
        testlab_1.expect(spy.called).to.be.False();
    });
    function createSequence() {
        let LogSequence = class LogSequence {
            constructor(findRoute, parseParams, invoke, send, reject, logger) {
                this.findRoute = findRoute;
                this.parseParams = parseParams;
                this.invoke = invoke;
                this.send = send;
                this.reject = reject;
                this.logger = logger;
            }
            async handle(context) {
                const { request, response } = context;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let args = [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let result;
                try {
                    const route = this.findRoute(request);
                    args = await this.parseParams(request, route);
                    result = await this.invoke(route, args);
                    this.send(response, result);
                }
                catch (error) {
                    this.reject(context, error);
                    result = error;
                }
                await this.logger(request, args, result);
            }
        };
        LogSequence = tslib_1.__decorate([
            tslib_1.__param(0, core_1.inject(SequenceActions.FIND_ROUTE)),
            tslib_1.__param(1, core_1.inject(SequenceActions.PARSE_PARAMS)),
            tslib_1.__param(2, core_1.inject(SequenceActions.INVOKE_METHOD)),
            tslib_1.__param(3, core_1.inject(SequenceActions.SEND)),
            tslib_1.__param(4, core_1.inject(SequenceActions.REJECT)),
            tslib_1.__param(5, core_1.inject(__1.EXAMPLE_LOG_BINDINGS.LOG_ACTION)),
            tslib_1.__metadata("design:paramtypes", [Function, Function, Function, Function, Function, Function])
        ], LogSequence);
        app.sequence(LogSequence);
    }
    async function createApp() {
        app = new LogApp();
        app.bind(__1.EXAMPLE_LOG_BINDINGS.TIMER).to(timer);
        app.bind(__1.EXAMPLE_LOG_BINDINGS.LOGGER).to(in_memory_logger_1.logToMemory);
    }
    function setAppLogToDebug() {
        app.logLevel(__1.LOG_LEVEL.DEBUG);
    }
    function setAppLogToWarn() {
        app.logLevel(__1.LOG_LEVEL.WARN);
    }
    function setAppLogToError() {
        app.logLevel(__1.LOG_LEVEL.ERROR);
    }
    function setAppLogToInfo() {
        app.logLevel(__1.LOG_LEVEL.INFO);
    }
    function setAppLogToOff() {
        app.logLevel(__1.LOG_LEVEL.OFF);
    }
    function createController() {
        class MyController {
            debug() {
                return 'debug called';
            }
            warn() {
                return 'warn called';
            }
            info() {
                return 'info called';
            }
            error() {
                return 'error called';
            }
            off() {
                return 'off called';
            }
            hello(name) {
                return `hello ${name}`;
            }
            nolog() {
                return 'nolog called';
            }
        }
        tslib_1.__decorate([
            rest_1.get('/debug'),
            __1.log(__1.LOG_LEVEL.DEBUG),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], MyController.prototype, "debug", null);
        tslib_1.__decorate([
            rest_1.get('/warn'),
            __1.log(__1.LOG_LEVEL.WARN),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], MyController.prototype, "warn", null);
        tslib_1.__decorate([
            rest_1.get('/info'),
            __1.log(__1.LOG_LEVEL.INFO),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], MyController.prototype, "info", null);
        tslib_1.__decorate([
            rest_1.get('/error'),
            __1.log(__1.LOG_LEVEL.ERROR),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], MyController.prototype, "error", null);
        tslib_1.__decorate([
            rest_1.get('/off'),
            __1.log(__1.LOG_LEVEL.OFF),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], MyController.prototype, "off", null);
        tslib_1.__decorate([
            rest_1.get('/'),
            __1.log(),
            tslib_1.__param(0, rest_1.param.query.string('name')),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [String]),
            tslib_1.__metadata("design:returntype", void 0)
        ], MyController.prototype, "hello", null);
        tslib_1.__decorate([
            rest_1.get('/nolog'),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], MyController.prototype, "nolog", null);
        app.controller(MyController);
    }
    function timer(startTime) {
        if (!startTime)
            return [3, 3];
        return [2, 2];
    }
});
//# sourceMappingURL=log.extension.acceptance.js.map