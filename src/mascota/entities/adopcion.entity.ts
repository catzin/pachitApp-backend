import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn, ManyToMany, JoinTable } from 'typeorm';

import { Mascota } from './mascota.entity';
import { Usuario } from 'src/user/entity/usuario.entity';
import { Organizacion } from 'src/organizacion/entitites/organizacion.entity';
import { TiempoSeguimiento } from './tiempo-seguimiento';
import { Imagenes } from './imagenes.entity';

@Entity()
export class Adopcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fechaAdopcion: Date;

  @ManyToOne(() => Organizacion, organizacion => organizacion.adopciones)
  organizacion: Organizacion;

  @ManyToOne(() => Usuario, usuario => usuario.adopciones)
  usuario: Usuario;

  @ManyToOne(() => Mascota, mascota => mascota.adopciones)
  mascota: Mascota;

  
  @ManyToOne(() => TiempoSeguimiento)
  @JoinColumn({name : 'tipoSeguimiento_idTiempoSeguimiento'})
  tipoSeguimiento_idTiempoSeguimiento: number; 

  @ManyToMany(() => Imagenes,imagen =>imagen.imgsSeguimiento)
  @JoinTable({
    name:'evidencia_seguimiento',
    joinColumn:{
      name:'adopcion_id',
      referencedColumnName:'id'
    },
    inverseJoinColumn:{
      name:'imagen_id',
      referencedColumnName:'id'
    }
  })
  adopcionImgs: Imagenes[];
}