import { Provider } from '@loopback/core';
import { TimerFn } from '../types';
export declare class TimerProvider implements Provider<TimerFn> {
    constructor();
    value(): TimerFn;
}
