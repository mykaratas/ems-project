import { Constructor, Getter, Provider } from '@loopback/core';
import { LOG_LEVEL } from '../keys';
import { LogFn, LogWriterFn, TimerFn } from '../types';
export declare class LogActionProvider implements Provider<LogFn> {
    private readonly getController;
    private readonly getMethod;
    timer: TimerFn;
    writeLog: LogWriterFn;
    logLevel: LOG_LEVEL;
    constructor(getController: Getter<Constructor<{}>>, getMethod: Getter<string>, timer: TimerFn);
    value(): LogFn;
    private action;
}
