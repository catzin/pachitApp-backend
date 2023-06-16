import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';

@Module({
  imports: [
    MailerModule.forRoot({
      // Configuración de nodemailer
    }),
  ],
  controllers: [GoogleController],
  providers: [GoogleService],
})
export class GoogleModule {}