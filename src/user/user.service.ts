import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Usuario } from './entity/usuario.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
  ) {}

  get(): Promise<Usuario[]> {
    return this.userRepository.find();
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

//   update(updateUserDto: UpdateUserDto, userId: number) {
//     return this.userRepository.update(userId, updateUserDto);
//   }

//   show(id: number) {
//     return this.userRepository.findOne({ where: { id } });
//   }

   findByCorreo(correo: string) {
    return this.userRepository.findOne({ where: { correo } });
    }

//   delete(userId: number) {
//     return this.userRepository.delete(userId);
//   }
}