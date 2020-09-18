import { Constructor } from '@loopback/core';
import { LevelMetadata } from '../types';
/**
 * Mark a controller method as requiring logging (input, output & timing)
 * if it is set at or greater than Application LogLevel.
 * LOG_LEVEL.DEBUG < LOG_LEVEL.INFO < LOG_LEVEL.WARN < LOG_LEVEL.ERROR < LOG_LEVEL.OFF
 *
 * @param level - The Log Level at or above it should log
 */
export declare function log(level?: number): MethodDecorator;
/**
 * Fetch log level stored by `@log` decorator.
 *
 * @param controllerClass - Target controller
 * @param methodName - Target method
 */
export declare function getLogMetadata(controllerClass: Constructor<{}>, methodName: string): LevelMetadata;
