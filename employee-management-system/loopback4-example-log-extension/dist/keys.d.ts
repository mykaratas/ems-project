import { BindingKey } from '@loopback/core';
import { LogFn, LogWriterFn, TimerFn } from './types';
/**
 * Binding keys used by this component.
 */
export declare namespace EXAMPLE_LOG_BINDINGS {
    const APP_LOG_LEVEL: BindingKey<LOG_LEVEL>;
    const TIMER: BindingKey<TimerFn>;
    const LOGGER: BindingKey<LogWriterFn>;
    const LOG_ACTION: BindingKey<LogFn>;
}
/**
 * The key used to store log-related metadata via decorators and reflection.
 */
export declare const EXAMPLE_LOG_METADATA_KEY = "example.log.metadata";
/**
 * Enum to define the supported log levels
 */
export declare enum LOG_LEVEL {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    OFF = 4
}
