import * as Mail from 'nodemailer/lib/mailer';
import { TransportType } from './smtp-options.interface';

export interface SmtpTransportFactory {
    createTransport(opts?: TransportType): Mail;
}
