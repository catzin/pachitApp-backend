import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { SendEmailDto } from './dto/send-email.dto';
//import { google } from 'google-auth-library';


@Injectable()
export class GoogleService {

    constructor(private readonly mailerService:  MailerService){}







    
    sendEmailContrato(email: string, name: string, pdfBuffer: Buffer): void {
        this.mailerService.sendMail({
          to: email,
          from: 'pachidevelopers@gmail.com',
          subject: 'Contrato de Adopción',
          text: `Hola ${name}, adjunto encontrarás el contrato de adopción.`,
          attachments: [
            {
              filename: 'contrato_adopcion.pdf',
              content: pdfBuffer,
            },
          ],
        });
      }
}