import { sinon } from '@loopback/testlab';
export declare type AddSpy = sinon.SinonSpy<[(string | undefined)?], void>;
export declare type LogStub = sinon.SinonStub<[any?, ...any[]], void>;
export declare function createLogSpy(): sinon.SinonSpy<[msg?: string | undefined], void>;
export declare function restoreLogSpy(spy: AddSpy | LogStub): void;
export declare function createConsoleStub(): LogStub;
