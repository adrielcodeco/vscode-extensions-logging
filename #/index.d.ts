import { OutputChannel } from 'vscode';
export declare class ExtensionsLogging {
    private readonly logger;
    constructor(outputChannel: OutputChannel, loglevel?: string);
    static register(extensionName: string): ExtensionsLogging;
    log(log: any, context?: any): void;
    error(log: any, context?: any): void;
    warn(log: any, context?: any): void;
    info(log: any, context?: any): void;
    debug(log: any, context?: any): void;
    notice(log: any, context?: any): void;
    crit(log: any, context?: any): void;
    alert(log: any, context?: any): void;
    emerg(log: any, context?: any): void;
}
//# sourceMappingURL=index.d.ts.map