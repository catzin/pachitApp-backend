import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException, ParseUUIDPipe, UnauthorizedException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Usuario } from './entity/usuario.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { Peticion } from './entity/peticion.entity';
import { CreatePeticionDto } from './dto/create-peticion.dto';
import { CreateSolicitudAdopcionDto } from './dto/create-solicitud.dto';
import { Mascota } from 'src/mascota/entities/mascota.entity';
import { SolicitudAdopcion } from 'src/mascota/entities/solicitud-adopcion.entity';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { Ubicacion } from './entity/ubicacion.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { MascotaFavorita } from 'src/mascota/entities/mascota-favorita.entity';
import { S3Service } from 'src/s3/s3.service';
import { Referencia } from './entity/referencia.entity';
import { RelationShip } from 'src/catalogs/entities/relationShip.entity';
import { createReferenciaDto } from './dto/create-referencia.dto';
import { patchUserDto } from './dto/patch-user.dto';
import { Domicilio } from './entity/domicilio.entity';
import { Documento } from './entity/documento.entity';
import { HorarioContacto } from './entity/horario-contacto.entity';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateSeguimientoDto } from './dto/update-seguimiento.dto';
import { Adopcion } from 'src/mascota/entities/adopcion.entity';
import { Imagenes } from 'src/mascota/entities/imagenes.entity';
import { ImagenSeguimiento } from './entity/imagen-seguimiento.entity';


@Injectable()
export class UserService {

  private readonly logger = new Logger('UserService');

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
    @InjectRepository(Organizacion)
    private readonly organizacionRepository: Repository<Organizacion>,
    @InjectRepository(Peticion)
    private readonly peticionRepository: Repository<Peticion>,
    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,
    @InjectRepository(Ubicacion)
    private readonly ubicacionRepository: Repository<Ubicacion>,
    @InjectRepository(MascotaFavorita)
    private readonly mascotaFavoritaRepository: Repository<MascotaFavorita>,
    @InjectRepository(SolicitudAdopcion)
    private readonly solicitudAdopcionRepository: Repository<SolicitudAdopcion>,
    @InjectRepository(RelationShip)
    private readonly parentescoRepository: Repository<RelationShip>,
    @InjectRepository(Referencia)
    private readonly referenciaRepository: Repository<Referencia>,
    @InjectRepository(Domicilio)
    private readonly domicilioRepository: Repository<Domicilio>,
    @InjectRepository(Documento)
    private readonly documentoRepository: Repository<Documento>,
    @InjectRepository(HorarioContacto)
    private readonly horarioRepository: Repository<HorarioContacto>,
    @InjectRepository(Adopcion)
    private readonly adopcionRepository: Repository<Adopcion>,
    @InjectRepository(Imagenes)
    private readonly imagenesRepository: Repository<Imagenes>,
    @InjectRepository(ImagenSeguimiento)
    private readonly imagenSeguimientoRepository: Repository<ImagenSeguimiento>,
    private s3Service : S3Service
  ) {}

  



  async getUserType(idUsuario: string) {
    const user = await this.userRepository.findOne({
      where: { idusuario: idUsuario },
      relations: ['tipoUsuario_idTipoUsuario']

    });

    const { tipoUsuario_idTipoUsuario } = user;
    return tipoUsuario_idTipoUsuario;

  }

  async create(createUserDto: CreateUserDto) {
    try {

      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);

      return user;

    } catch (error) {
      this.handleDBExceptions(error);
    }
    return this.userRepository.save(createUserDto);
  }

  //get all users
  async findAll(paginationDto: PaginationDto) {
    //limite que establecemos para paginacion
    const { limit = 10, offset = 0 } = paginationDto


    const res = await this.userRepository.find({
      take: limit,
      skip: offset,

    });

    console.log(res);

    return res;
  }


  //getbyId

  async findOne(term: string) {
    const user = await this.userRepository.find({
      where: { idusuario: term },
      relations: ['sexo_idSexo', 'estadoCivil_idEstadoCivil', 'ocupacion_idOcupacion', 'tipoUsuario_idTipoUsuario', 'Tipodomicilio_idTipoDomicilio'],
    })

    if (!user[0]) {
      throw new NotFoundException('El usuario no fue encontrado');
    }


    return {
      status: HttpStatus.OK,
      message: 'Success',
      user: user
    }

  }

  async findAdoptProfile(term: string) {

    console.log(term);

    const user = await this.userRepository.findOne({
      where: { idusuario: term },
      relations: ['sexo_idSexo', 'estadoCivil_idEstadoCivil', 'ocupacion_idOcupacion', 'tipoUsuario_idTipoUsuario', 'Tipodomicilio_idTipoDomicilio', 'ubicacion', 'contactosReferencia']
      //relations:['sexo_idSexo','estadoCivil_idEstadoCivil','ocupacion_idOcupacion','tipoUsuario_idTipoUsuario','Tipodomicilio_idTipoDomicilio','ubicacion','contactosReferencia'],
    });

    if (!user) {
      throw new NotFoundException('El usuario no fue encontrado');
    }

    return {
      status: HttpStatus.OK,
      message: 'Success',
      user: user
    }

  }

  //delete
  async remove(idusuario: string) {
    const user = await this.findOne(idusuario);

    //await this.userRepository.remove(user);

  }


  //Lo que hace es buscar todas las propiedas y hacer un update
  async update(idusuario: string, updateUserDto: UpdateUserDto) {

    const user = await this.userRepository.preload({
      idusuario: idusuario,
      ...updateUserDto
    });

    if (!user) throw new NotFoundException(`Usuario con id: ${idusuario} not found`);


    try {
      await this.userRepository.save(user);
      return user;

    } catch (error) {
      this.handleDBExceptions(error);
    }


    await this.userRepository.save(user);

    return user;
  }

  private handleDBExceptions(error: any) {
    if (error.code == '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('Uncexpected error, chech server logs');

  }

  //CREA ORGANIZACION sin verificacion
  async createOrganizacion(organizacion: CreateOrganizacionDto, fotos: Express.Multer.File[]) {
    try {

      const { idusuario } = organizacion;

      const [validateStatus] = await this.peticionRepository.find({
        where: {
          usuario: { idusuario: idusuario }
        }

      });

      if (!validateStatus.estatus) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Usuario aún no tiene permiso para crear una organización',
        };
      }


      //Busca el id del usuario para ver si le puede asociar una organización
      const userFound = await this.userRepository.findOne({
        where: {
          idusuario,
        },
      });

      if (userFound) {
        userFound.tipoUsuario_idTipoUsuario = 2;
        userFound.roles = 'organizacion';
        await this.userRepository.save(userFound);
      }

      if (!userFound) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          message: 'No se encuentra el usuario',
        };
      }

      const orgFound = await this.organizacionRepository.findOne({
        where: {
          usuario: userFound,
        },
      });

      if (orgFound) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Ya tienes una organización asociada',
        };

      }

      //generamos las keys para cada archivo
      let keys = [];
      fotos.forEach((e, index) => {
        keys.push(`${e.originalname.split('.')[0]}${Date.now()}.${e.originalname.split('.')[1]}`);

      });

      const images = await this.s3Service.uploadFiles(fotos, keys);

      const newOrganizacion = this.organizacionRepository.create({
        ...organizacion,
        usuario: userFound,
      });

      newOrganizacion.linkFacebook = validateStatus.linkFacebook;
      newOrganizacion.linkInstagram = validateStatus.linkInstagram;
      newOrganizacion.linkWeb = validateStatus.linkWeb;
      newOrganizacion.estatus = 1;
      newOrganizacion.fotoPerfil = images[0];
      newOrganizacion.fotoPortada = images[1];
      await this.peticionRepository.update({ idPeticion: validateStatus.idPeticion }, { finalizada: true });
      await this.userRepository.update({ idusuario: idusuario }, { tipoUsuario_idTipoUsuario: 2 });

      const orgSaved = await this.organizacionRepository.save(newOrganizacion);

      return {
        status: HttpStatus.OK,
        newOrganizacion: orgSaved
      };


    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Please check server logs',
      };
    }
  }

  async verificaStatus(idPeticion: string) {

    try {
      const result = await this.peticionRepository.findOne({
        where: {
          idPeticion
        }
      });

      const { estatus, finalizada } = result;

      return { estatus, finalizada };

    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Por favor llama a un adulto',
      };

    }
  }



  // Manda peticion UpgradeOrganizacion
  async upgradeOrganizacion(peticion: CreatePeticionDto) {

    try {
      const { idusuario } = peticion;
      const userFound = await this.userRepository.findOne({
        where: {
          idusuario,
        },
      });

      if (!userFound) {
        throw new NotFoundException('User not found');

      }

      const peticionFound = await this.peticionRepository.findOne({
        where: {
          usuario: userFound,
        },
      });

      if (peticionFound) {

        return {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Los usuarios solo pueden tener una petición en proceso',
        };
      }

      const newPeticion = this.peticionRepository.create({
        ...peticion,
        usuario: userFound,
        finalizada: false
      });

      return this.peticionRepository.save(newPeticion);
    } catch (error) {
      console.log(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Please check server logs',
      };
    }
  }

  //Solicita la adopcion de una mascota
  async soliciutdAdopcion(solicitud: CreateSolicitudAdopcionDto) {
    try {

      //Una vez encontrado el usuario
      const userFound = await this.userRepository.findOne({
        where: {
          idusuario: solicitud.usuario
        },
      });

      if (!userFound) {
        throw new NotFoundException('User not found');

      }

      //Una vez encontrada la mascota que esta en adopcion
      const mascotaFound = await this.mascotaRepository.findOne({
        where: {
          id: solicitud.mascota,
          estatus: 1
        },
      });

      if (!mascotaFound) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Mascota not found or Mascota not avaliable for adopt',
        };
      }



      //Busca por una solicitud con ese usuario y estatus = 1(en proceso)
      const solicitudFound = await this.solicitudAdopcionRepository.findOne({
        where: {
          usuario: userFound,
          estatus: 1
        },
      })

      //Verifica que no exista esa solicitud, ya que los usuarios solo pueden tener una solicitud en proceso.
      if (solicitudFound) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Los usuarios solo pueden tener una solicitud en proceso',
        };
      }


      const newSolicitud = this.solicitudAdopcionRepository.create({
        ...solicitud,
        estatus: 1,
        usuario: userFound,
        mascota: mascotaFound
      });

      const saved = await this.solicitudAdopcionRepository.save(newSolicitud);
      const { usuario, ...resto } = saved;

      return resto;

    } catch (error) {
      console.log(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Please check server logs',
      };
    }
  }

  //Crear ubicacion de el usuario
  async creaUbicacion(ubicacion: CreateUbicacionDto) {
    try {

      //Una vez encontrado el usuario
      const userFound = await this.userRepository.findOne({
        where: {
          idusuario: ubicacion.usuario_idusuario
        },
      });


      if (!userFound) {
        throw new NotFoundException('User not found');

      }


      //Busca por una solicitud con ese usuario y estatus = 1(en proceso)
      const solicitudFound = await this.ubicacionRepository.findOne({
        where: {
          usuario: userFound
        },
      })

      //Verifica que no exista esa solicitud, ya que los usuarios solo pueden tener una solicitud en proceso.
      if (solicitudFound) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          ubicacion: {},
        };
      }


      const newUbicacion = this.ubicacionRepository.create({
        ...ubicacion,
        usuario: userFound,
      });

      const saved = await this.ubicacionRepository.save(newUbicacion);
      const ubicacionData = { ...saved };
      delete ubicacionData.usuario;
      return ubicacionData;

    } catch (error) {
      console.log(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Please check server logs',
      };
    }
  }

  //get all ubicaciones por usuario
  async findOndeUserUbicacion(term: string) {
    //aqui se hace la validacion para ver por donde busca
    if (isUUID(term)) {

      const userFound = await this.userRepository.findOne({
        where: {
          idusuario: term
        }
      });

      const ubicacionFound = await this.ubicacionRepository.findOne({
        where: {
          usuario: userFound
        }
      });

      if (ubicacionFound) {
        return {
          status: HttpStatus.OK,
          ubicacion: ubicacionFound
        }
      }
      else {
        return {
          status: HttpStatus.NOT_FOUND,
          ubicacion: {}
        }
      }

    }
    else {

      return {
        status: HttpStatus.NOT_FOUND,
        ubicacion: {}
      }

    }
  }



  //Da like a mascota
  async likeMascota(likeDto: CreateLikeDto) {
    try {

      //Una vez encontrado el usuario
      const userFound = await this.userRepository.findOne({
        where: {
          idusuario: likeDto.usuario
        },
      });



      if (!userFound) {
        throw new NotFoundException('User not found');

      }

      //Una vez encontrada la mascota que esta en adopcion
      const mascotaFound = await this.mascotaRepository.findOne({
        where: {
          id: likeDto.mascota,
          estatus: 1
        },
        relations: {
          mascotaImgs: true,
          caracteristicas: true,
          tipoMascota_idtipoMascota: true,
          tipoRaza_idtipoRaza: true,
          nivelActividad_idnivelActividad: true,
          edad: true

        }

      });



      if (!mascotaFound) {
        throw new NotFoundException('La mascota no fue encontrado');
      }

      const mascotaFavoritaFound = await this.mascotaFavoritaRepository.findOne({
        where: {
          usuario: userFound,
          mascota: mascotaFound
        },
      })



      if (mascotaFavoritaFound) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Los usuarios solo pueden dar like una vez a la mascota',
        };
      }

      const newLike = await this.mascotaFavoritaRepository.create({
        usuario: userFound,
        mascota: mascotaFound
      });

      await this.mascotaFavoritaRepository.save(newLike);

      return mascotaFound;

    } catch (error) {
      console.log(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Please check server logs',
      };
    }
  }

  async countLikesByPet(idmascota: number) {
    const result = await this.mascotaFavoritaRepository.count({
      where: { mascota: { id: idmascota } }
    });

    return result;

  }



  async updateProfilePicture(file: Express.Multer.File, idUsuario: string) {

    const user = await this.userRepository.findOneOrFail({
      where: { idusuario: idUsuario },

    })

    if (!user) {

      throw new HttpException(
        "ID no válido",
        400
      );
    }


    const key = `${file.originalname.split('.')[0]}${Date.now()}.${file.originalname.split('.')[1]}`;
    const imageUrl = await this.s3Service.uploadFile(file, key);
    await this.userRepository.update(
      { idusuario: idUsuario },
      { fotoPerfil: imageUrl }

    );

    return {
      status: HttpStatus.OK,
      imageUrl
    }




  }

  //Obtiene las mascotas favoritas del usuario
  async findMascotasFavoritas(idUsuario: string) {

    const pets = await this.mascotaFavoritaRepository.find({
      where: { usuario: { idusuario: idUsuario } },
      relations: ['mascota', 'mascota.mascotaImgs', 'mascota.caracteristicas', 'mascota.tipoMascota_idtipoMascota', 'mascota.tipoRaza_idtipoRaza', 'mascota.nivelActividad_idnivelActividad', 'mascota.edad'],
    });

    if (!pets) {
      throw new NotFoundException('Algo salio mal');
    }

    return pets;

  }

  async dislikePet(data: CreateLikeDto) {

    const deleteMascota = await this.mascotaFavoritaRepository.delete({ mascota: { id: data.mascota }, usuario: { idusuario: data.usuario } });
    if (!deleteMascota) {
      throw new NotFoundException('No hay mascotas');
    }
    const { affected } = deleteMascota;

    return affected;


  }


  async getProfileImage(idUsuario: string) {
    const result = await this.userRepository.findOne({
      where: { idusuario: idUsuario }
    })

    if (!result) {
      throw new HttpException(
        "ID no válido",
        400
      );
    }

    const { fotoPerfil } = result;

    return {
      status: HttpStatus.OK,
      message: "Success",
      image: fotoPerfil
    }

  }

  async verificarCorreo(email: string): Promise<boolean> {
    const usuario = await this.userRepository.findOne(
      { where: { correo: email } });
    return !!usuario; // Devuelve true si se encontró un usuario con el correo proporcionado
  }

  //Contar likes de cada mascota 
  async contarMascotaFavorita(idMascota: number): Promise<number> {
    const result = await this.connection.query(
      `CALL sp_contarMascotaFavorita(${idMascota})`,
    );
    return result[0][0].cantidad;
  }

  //Mascota mas likeada
  async mascotaMasLikeada(): Promise<any> {
    const result = await this.connection.query('CALL sp_mascotaMasLikeada()');
    return result[0][0];
  }

  async createReference(data: createReferenciaDto) {

    const userFound = await this.userRepository.findOne({
      where: {
        idusuario: data.idUsuario
      }
    });

    const parentezco = await this.parentescoRepository.findOne({
      where: {
        idparentesco: data.idParentesco
      }
    })

    if (!userFound) {
      throw new HttpException(
        "ID no válido",
        400
      );
    }

    const referencia = this.referenciaRepository.create({
      nombre: data.nombre,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      telefono: data.telefono,
      active: data.active,
      parentesco_idParentesco: parentezco,
      usuario: userFound,


    });

    const saved = await this.referenciaRepository.save(referencia);

    const { usuario, ...referenciaSinUsuario } = saved;

    return referenciaSinUsuario;

  }

  async deleteReference(id: string) {

    const referenciaFound = await this.referenciaRepository.delete({ idReferencia: id });

    if (!(referenciaFound.affected >= 1)) {
      throw new HttpException(
        "ID no válido",
        400
      );
    }

    return {
      status: HttpStatus.OK,
      message: "Referencia eliminada"
    }

  }


  async searchReferences(id: string) {

    const references = await this.referenciaRepository.find({
      relations: {
        parentesco_idParentesco: true
      },
      where: {
        usuario: { idusuario: id },
        active: 1,

      }

    })

    if (!references) {
      throw new HttpException(
        "ID no válido",
        400
      );
    }

    return {
      status: HttpStatus.OK,
      message: "Success",
      referencias: references
    }
  }


  async verifyShelterUser(idUsuario: string) {


    const user = await this.userRepository.findOne({
      where: {
        idusuario: idUsuario
      },
      relations: {
        organizacion: true
      }

    });

    if (!user) {
      throw new NotFoundException('Usuario incorrecto');
    }

    if (!user.organizacion) {
      throw new NotFoundException('Este usuario no tiene asociada una organización');
    }

    const { organizacion } = user;
    const { nombre } = organizacion;

    return nombre;

  }


  async updateUserInfo(data: patchUserDto) {

    const updatedFields: Partial<Usuario> = {
      linkFacebook: data.facebookLink,
      linkInstagram: data.instagramLink,
      sexo_idSexo: data.sexo_idSexo,
      estadoCivil_idEstadoCivil: data.estadoCivil_idEstadoCivil,
      ocupacion_idOcupacion: data.ocupacion_idOcupacion,
      Tipodomicilio_idTipoDomicilio: data.Tipodomicilio_idTipoDomicilio,
    };


    const updateInfo = await this.userRepository.update({ idusuario: data.idusuario }, updatedFields);
    return updateInfo;

  }


  async findMostLiked() {

    const queryResult = await this.mascotaFavoritaRepository
      .createQueryBuilder('mascotaFavorita')
      .select('mascotaFavorita.mascota.id', 'mascotaId')
      .addSelect('COUNT(*)', 'count')
      .groupBy('mascotaFavorita.mascota.id')
      .orderBy('count', 'DESC')
      .getRawMany();

    if (queryResult.length > 0) {
      return queryResult[0].mascotaId;
    }

    return -1;


  }


  async uploadResidenceEvidence(idUsuario: string, files: Express.Multer.File[]) {
    try {


      const usuario = await this.userRepository.find({
        where : { idusuario : idUsuario}
      });

    
      if (!usuario) {
        throw new BadRequestException('ID no váido');
      }

      const [user] = usuario;

      let keys = [];
      files.forEach((e, index) => {
        keys.push(`${e.originalname.split('.')[0]}${Date.now()}.${e.originalname.split('.')[1]}`);

      });

      const imagesUrl = await this.s3Service.uploadFiles(files, keys);
      const domis = [];

      for (let image of imagesUrl) {
        const domi = await this.domicilioRepository.create({
          path: image,
          usuario: user
        });

        domis.push(domi);
      }

      const saved = await this.domicilioRepository.save(domis);
      const { path, idDomicilio } = saved[0];

      return {
        path,
        idDomicilio
      };

    } catch (error) {
      console.log(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Please check server logs',
      };
    }

  }


  async uploadDocumentsEvidence(idUsuario: string, files: Express.Multer.File[]) {
    try {


      const usuario = await this.userRepository.find({
        where : { idusuario : idUsuario}
      });

    
      if (!usuario) {
        throw new BadRequestException('ID no váido');
      }

      const [user] = usuario;

      let keys = [];
      files.forEach((e, index) => {
        keys.push(`${e.originalname.split('.')[0]}${Date.now()}.${e.originalname.split('.')[1]}`);

      });

      const imagesUrl = await this.s3Service.uploadFiles(files, keys);
      const domis = [];

      for (let image of imagesUrl) {
        const domi = await this.documentoRepository.create({
          path: image,
          usuario: user
        });

        domis.push(domi);
      }

      const saved = await this.domicilioRepository.save(domis);
      const { path, idDocumento } = saved[0];
      
      return {
        path,
        idDocumento
      };

    } catch (error) {
      console.log(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Please check server logs',
      };
    }

  }

  async verifyResidenceEvidence(idUsuario : string){

    const user = await this.userRepository.find({
      where : { idusuario : idUsuario},
      relations : {
        domicilio : true
      }
     
    });

    if(!user){
      throw new NotFoundException('ID no váido');
    }

    const [usr] = user;
    const {domicilio} = usr;

    return domicilio;

  }


  async createContactHour(data : CreateHorarioDto){

    const user = await this.userRepository.find({
      where : { idusuario : data.idUsuario}
    });

    if(!user){
      throw new BadRequestException();
    }

    const [usr] = user;

    const horario = await this.horarioRepository.create({
      especificacion : data.horario,
      usuario : usr
    });

    const saved = await this.horarioRepository.save(horario);

    return saved;
    
  }

  async findContactHourInfo(idusuario: string) {

    const userContact = await this.horarioRepository.findOne({
      where: { usuario: { idusuario: idusuario } }
    });

    if(!userContact){
      throw new NotFoundException();
    }

  

    return userContact;

  }


  async updateContactHour(data : CreateHorarioDto){

    const userUpdate = await this.horarioRepository.update({usuario : { idusuario : data.idUsuario}}, { especificacion : data.horario});

    if(userUpdate.affected > 0){
      return 1;
    }

    return -1;

  }
    async updateAdopcionSeguimiento(updateSeguimientoDto:UpdateSeguimientoDto){
      
      //Busca el id del usuario
      const userFound = await this.userRepository.findOne({
          where:{
            idusuario: updateSeguimientoDto.usuario
          },
      });

      if (!userFound) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          message: 'No se encontro al Usuario',
        };
        
      }
      
       //Busca que la solicitud sea estatus 3 con ese usuario y mascota
       const adopcionFound = await this.adopcionRepository.findOne({
        where: {
          usuario: userFound
        }
      });
      
      if (!adopcionFound) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          message: 'No se ha encontrado una adopcion con el usuario ingresado',
        };
      }   

      //Actualiza la adopcion el el tiempo de seguimiento
      adopcionFound.tipoSeguimiento_idTiempoSeguimiento = updateSeguimientoDto.tipoSeguimiento;

      //Rellene la tabla seguimiento

      // Guardar los cambios en la base de datos
      await this.adopcionRepository.save(adopcionFound);

      return {
        status: HttpStatus.OK,
        message: `Se ha establecido el tiempo de seguimeinto a la adopcion`
      };


    }




    async uploadImagenSeguimiento(idUsuario: string, file: Express.Multer.File) {
      try {


        //Busca el id del usuario
        const adopcionFound = await this.adopcionRepository.findOne({
          where: {
            usuario: {idusuario:idUsuario}
          },
        });

        if (!adopcionFound) {
          return {
            status: HttpStatus.UNAUTHORIZED,
            message: 'No se encontro la adopcion',
          };

        }
        

        console.log(adopcionFound);
  
        let key = `${file.originalname.split('.')[0]}${Date.now()}.${file.originalname.split('.')[1]}`;
         
     

        const imagesUrl = await this.s3Service.uploadFile(file, key);  
  
          const imagen = await this.imagenSeguimientoRepository.create({
            path: imagesUrl,
            adopcion: adopcionFound,

          });
  
         
        
  
        const saved = await this.imagenSeguimientoRepository.save(imagen);
  
        return  saved;
  
      } catch (error) {
        console.log(error);
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Please check server logs',
        };
      }
  
    }




}