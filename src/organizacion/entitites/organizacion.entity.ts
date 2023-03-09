import { Usuario } from 'src/auth/entities/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'organizacion' })
export class OrganizacionEntity {
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

//   @ManyToOne(() => Usuario, (usuario) => usuario.organizaciones)
//   usuario: Usuario;

  @Column()
  usuario_idusuario: string;
}