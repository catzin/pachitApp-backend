import { Usuario } from 'src/user/entity/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'organizacion' })
export class Organizacion{
  @PrimaryGeneratedColumn('uuid')
  idorganizacion: string;

  @Column({ type: 'varchar', length: 45 })
  nombre: string;

  @Column({ type: 'varchar', length: 45 })
  descripcion: string;

  @Column({ type: 'date' })
  fechaCreacion: Date;

  @Column({ type: 'varchar', length: 45, nullable: true })
  linkInstagram: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  linkFacebook: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  fotoPerfil: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  fotoPortada: string;

  @Column({ type: 'integer' })
  estatus: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  linkDonacion: string;

  @OneToOne(() => Usuario)
  @JoinColumn()
  usuario_idusuario: Usuario


}