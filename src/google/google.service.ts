import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { SendEmailDto } from './dto/send-email.dto';
//import { google } from 'google-auth-library';


@Injectable()
export class GoogleService {

    constructor(private readonly mailerService:  MailerService){}


    async createEvent(accessToken: string, idToken: string, eventData: any) {
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
          access_token: accessToken,
          id_token: idToken,
        });
    
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        const eventDataUse = {
            summary: 'Título del evento',
            start: {
                dateTime: '2023-05-24T10:00:00', // Fecha y hora de inicio del evento
                timeZone: 'America/New_York', // Zona horaria del evento
            },
            end: {
                dateTime: '2023-05-24T12:00:00', // Fecha y hora de finalización del evento
                timeZone: 'America/New_York', // Zona horaria del evento
            },
        };

        // try {
        //     const event = await calendar.events.insert({
        //         calendarId: 'primary',
        //         resource: eventDataUse,
        //     });

        //     console.log('Evento creado:', event.data);
        // } catch (error) {
        //     console.error('Error al crear el evento:', error);
        // }

    }



    sendEmail(sendEmailDto: SendEmailDto): void {
        this.mailerService.sendMail({
            to: sendEmailDto.email,
            from: 'alex.iparrea.granados@gmail.com',
            subject: 'Pruebas nodemailer',
            text: `Hola ${sendEmailDto.name}, bienvenido`,
            html: '<h1>Ya quedó genial</h1>'
        });
    }

}