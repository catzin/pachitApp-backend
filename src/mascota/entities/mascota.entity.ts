import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';
import { Caracteristica } from './caracteristica.entity';
import { TipoMascota } from './tipo-mascota.entity';
import { TipoRaza } from './tipo-raza.entity';
import { NivelActividad } from './nivel-actividad.entity';
import { Imagenes } from 'src/mascota/entities/imagenes.entity';
import { Usuario } from 'src/user/entity/usuario.entity';
import { SolicitudAdopcion } from './solicitud-adopcion.entity';
import { MascotaFavorita } from './mascota-favorita.entity';
import { PetAge } from 'src/catalogs/entities';
import { Adopcion } from './adopcion.entity';
import { TiempoSeguimiento } from './tiempo-seguimiento';
//import { MascotaImagenn } from './mascotaImg.entity';


@Entity("mascota")
export class Mascota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  nombre: string;

  @Column({ length: 500 })
  descripcion: string;

  @ManyToOne(() => PetAge)
  @JoinColumn({name : 'edad'})
  edad: PetAge;

  @Column()
  estatus: number;

  @Column({ length: 45 })
  sexo: string;


  @ManyToOne(() => Organizacion)
  @JoinColumn({ name: 'id_organizacion' })
  organizacion: Organizacion;

  @ManyToOne(() => TipoMascota, (tipoMascota) => tipoMascota.mascotas)
  @JoinColumn({ name: 'idtipoMascota' })
  tipoMascota_idtipoMascota: TipoMascota;

  @ManyToOne(() => TipoRaza, (tipoRaza) => tipoRaza.mascotas)
  @JoinColumn({ name: 'idtipoRaza' })
  tipoRaza_idtipoRaza: TipoRaza;

  @ManyToOne(() => NivelActividad, (nivelActividad) => nivelActividad.mascotas)
  @JoinColumn({ name: 'idnivelActividad' })
  nivelActividad_idnivelActividad: NivelActividad;

  @Column()
  secureDisable : number;

  @ManyToMany(() => Caracteristica)
  @JoinTable({
    name:'caracteristicas'
  })
  caracteristicas: Caracteristica[];

  @ManyToMany(() => Imagenes,imagen =>imagen.mascotas, {cascade : true})
  @JoinTable({
    name:'mascota_imagen',
    joinColumn:{
      name:'mascota_id',
      referencedColumnName:'id'
    },
    inverseJoinColumn:{
      name:'imagen_id',
      referencedColumnName:'id'
    }
  })
  mascotaImgs: Imagenes[];

  @OneToMany(() => SolicitudAdopcion, 
  solicitudAdopcion => solicitudAdopcion.mascota)
  solicitudAdopcion: SolicitudAdopcion[];

  
  @OneToMany(() => MascotaFavorita, 
  mascotaFavorita => mascotaFavorita.mascota)
  mascotaFavorita: MascotaFavorita[];


  @OneToMany(() => Adopcion, adopcion => adopcion.mascota)
  adopciones: Adopcion[];
 

 


}