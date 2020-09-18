export declare class InMemoryLog {
    private entries;
    add(msg?: string): void;
    reset(): void;
}
export declare const inMemLog: InMemoryLog;
export declare function logToMemory(msg: string, level: number): void;
export declare function resetLogs(): void;
