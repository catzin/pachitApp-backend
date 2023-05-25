import { Body, Controller, Get, Post } from '@nestjs/common';
import { GoogleService } from './google.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('google')
export class GoogleController {
    
    constructor(private readonly googleCalendarService: GoogleService) {}

    // @Post('create-event')
    // async createEvent(@Body() eventData: any) {
    //   // Llama al servicio para crear el evento en el Google Calendar
    //   await this.googleCalendarService.createEvent(eventData.accessToken, eventData.idToken, eventData.eventData);
    // }

    @Post()
    sendEmail(@Body() sendEmailDto: SendEmailDto): void {
      // Aquí puedes utilizar las propiedades de `sendEmailDto` para enviar el email
      this.googleCalendarService.sendEmail(sendEmailDto);
    }
}
