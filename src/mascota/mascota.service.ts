import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdopcionDto } from './dto/create-adopcion.dto';
import { SolicitudAdopcion } from './entities/solicitud-adopcion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/user/entity/usuario.entity';
import { Mascota } from './entities/mascota.entity';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';
import { Adopcion } from './entities/adopcion.entity';
import { ChangeEstatusMascotaDto } from './dto/change-estatus-mascota.dto';
import { ChangeEstatusSolicitudDto } from './dto/change-estatus-solicitud.dto';
import { TiempoSeguimiento } from './entities/tiempo-seguimiento';

@Injectable()
export class MascotaService {

    constructor(
        @InjectRepository(SolicitudAdopcion)
        private readonly solicitudAdopcionRepository: Repository<SolicitudAdopcion>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        @InjectRepository(Mascota)
        private readonly mascotaRepository: Repository<Mascota>,
        @InjectRepository(Organizacion)
        private readonly organizacionRepository: Repository<Organizacion>,
        @InjectRepository(Adopcion)
        private readonly adopcionRepository: Repository<Adopcion>,
        @InjectRepository(TiempoSeguimiento)
        private readonly tipoSeguimientoRepository: Repository<TiempoSeguimiento>,
      ) {}



    //Crear Adopcion 
    async createAdopcion(createAdopcionDto:CreateAdopcionDto){
      
      try{
        //Busca el id del usuario
        const userFound = await this.usuarioRepository.findOne({
            where:{
              idusuario: createAdopcionDto.idusuario
            },
          });

        if (!userFound) {
          return {
            status: HttpStatus.UNAUTHORIZED,
            message: 'No se encontro al Usuario',
          };
          
        }

        //Busca el id de la mascota
        const mascotaFound = await this.mascotaRepository.findOne({
          where:{
            id: createAdopcionDto.idmascota
          },
        });

        if (!mascotaFound) {
          return {
            status: HttpStatus.UNAUTHORIZED,
            message: 'No se encontro la Mascota',
          };
        
         }  
         
        //Busca el id de la organizacion
        const organziacionFound = await this.organizacionRepository.findOne({
          where:{
            idorganizacion: createAdopcionDto.idorganizacion
          },
        });

        if (!organziacionFound) {
          return {
            status: HttpStatus.UNAUTHORIZED,
            message: 'No se encontro la Organizacion',
          };
        }        


        //Busca que la solicitud sea estatus 3 con ese usuario y mascota
        const validateSolicitud = await this.solicitudAdopcionRepository.findOne({
          where: {
            usuario: userFound,
            mascota: mascotaFound,
            estatus: 3
          }
        });
        
        if (!validateSolicitud) {
          return {
            status: HttpStatus.UNAUTHORIZED,
            message: 'La ADOPCION aun no esta utorizada por la organizacion',
          };
        }   

        //AQUI SE REALIZA LA ADOPCION
        //Se debe modificar luego para poner el id de seguimiento
        const newAdopcion = this.adopcionRepository.create({
          organizacion:organziacionFound,
          usuario:userFound,
          mascota:mascotaFound,
          fechaAdopcion:createAdopcionDto.fechaAdopcion
        });

        const adopcionSaved = await this.adopcionRepository.save(newAdopcion);

        
        return {
          status : HttpStatus.OK,
          newAdopcion : adopcionSaved
        };
        
      } catch (error) {
        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Please check server logs in mascota-service',
        };
     }

    }


     //Cambia el estatus de las mascotas 1-Adotpable 0-No Adoptable
     async cambiaEstatusMascota(changeEstatusMascotaDto:ChangeEstatusMascotaDto){
    
        const orgFound = await this.organizacionRepository.findOne({
          where: {
            idorganizacion: changeEstatusMascotaDto.organizacionId,
          },
        });

        if (!orgFound) {
          return {
            status: HttpStatus.UNAUTHORIZED,
            message: 'Organizacion not found',
          };
          
        }

        //Una vez encontrada la mascota 
        const mascotaFound = await this.mascotaRepository.findOne({
            where: {
                id: changeEstatusMascotaDto.mascotaId,
                organizacion:orgFound
            },
        });

        if (!mascotaFound) {
            return {
                status: HttpStatus.UNAUTHORIZED,
                message: 'Mascota not found',
            }; 
        }



        // Obtener el nuevo estatus
        const nuevoEstatus = changeEstatusMascotaDto.estatus ? 1 : 0;

        // Actualizar el estatus de la mascota
        mascotaFound.estatus = nuevoEstatus;

        // Guardar los cambios en la base de datos
        await this.mascotaRepository.save(mascotaFound);

        return {
          status: HttpStatus.OK,
          message: `Estatus de mascota actualizado correctamente. Nuevo estatus: ${mascotaFound.estatus}`
        };
            

      }


     async cambiaEstatusSolicitudes(changeEstatusSolicitudDto: ChangeEstatusSolicitudDto) {
        
        const solicitudFound = await this.solicitudAdopcionRepository.findOne({
          where: {
            idSolicitudAdopcion: changeEstatusSolicitudDto.idSolicitud,
          },
        });
      
        if (!solicitudFound) {
          return {
            status: HttpStatus.UNAUTHORIZED,
            message: 'Solicitud not found',
          };
        }
        
        // Incrementa el estatus en 1 o vuelve a 1 si ya es 3
        solicitudFound.estatus = solicitudFound.estatus === 3 ? 1 : solicitudFound.estatus + 1;

        // Guarda los cambios en la base de datos
        await this.solicitudAdopcionRepository.save(solicitudFound);

        let estatusText = '';
        switch (solicitudFound.estatus) {
          case 1:
            estatusText = 'En proceso';
            break;
          case 2:
            estatusText = 'Cancelada';
            break;
          case 3:
            estatusText = 'Aceptada';
            break;
          default:
            estatusText = 'Desconocido';
            break;
        }
      
        return {
          status: HttpStatus.OK,
          message: 'Estatus de solicitud cambiado exitosamente',
          solicitud: {
            id: solicitudFound.idSolicitudAdopcion,
            estatus: estatusText,
            // Otros campos de la solicitud que desees retornar
          },
        };
       
  
      }

   

    //Verifica el tiempo de seguimiento para todos los usuarios
    async verificaTiempoNotificacionSeguimiento() {
      

      const adopciones = await this.adopcionRepository.find();
    
      for (const adopcion of adopciones) {
        const tipoSeguimiento = await this.tipoSeguimientoRepository.findOne({
          where: { idTiempoSeguimiento: adopcion.tipoSeguimiento_idTiempoSeguimiento},
        });
    
        if (tipoSeguimiento && tipoSeguimiento.idTiempoSeguimiento === 1) {
          const fechaCreacion = new Date(adopcion.fechaAdopcion); // Convertir la cadena de texto a un objeto Date
          const fechaNotificacion15Dias = new Date(fechaCreacion.getTime() + 15 * 24 * 60 * 60 * 1000);
          const fechaNotificacion30Dias = new Date(fechaCreacion.getTime() + 30 * 24 * 60 * 60 * 1000);
          const fechaNotificacion60Dias = new Date(fechaCreacion.getTime() + 60 * 24 * 60 * 60 * 1000);
    
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          
          
          const x = new Date(today.getTime());
          console.log(x.toISOString()); // Convierte la fecha a un formato ISO 8601 legible

          if (today.getTime() === fechaNotificacion15Dias.getTime()) {
            // Realizar acción para notificar a los usuarios después de 15 días
            
            console.log('Notificar después de 15 días:', adopcion);
          }
    
          if (today.getTime() === fechaNotificacion30Dias.getTime()) {
            // Realizar acción para notificar a los usuarios después de 30 días
            console.log('Notificar después de 30 días:', adopcion);
          }
    
          if (today.getTime() === fechaNotificacion60Dias.getTime()) {
            // Realizar acción para notificar a los usuarios después de 60 días
            console.log('Notificar después de 60 días:', adopcion);
          }
          
        }
      }
    }


}
