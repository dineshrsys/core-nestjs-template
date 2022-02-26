/** Interfaces **/
import { SmtpOptions } from './smtp-options.interface';

export interface TemplateAdapter {
    compile(
        mail: any,
        callback: (err?: any, body?: string) => any,
        options: SmtpOptions,
    ): void;
}
