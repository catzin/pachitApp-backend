import { Injectable, OnModuleInit } from "@nestjs/common";
import { MascotaService } from "./mascota/mascota.service";

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private mascotaService: MascotaService
  ) {}

  async onModuleInit() {
    await this.mascotaService.verificaTiempoNotificacionSeguimiento();
  }
}