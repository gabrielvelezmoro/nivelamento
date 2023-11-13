import { Controller, Post, Body } from '@nestjs/common';
import { AuthService as Auth } from './auth/auth.service';
import { UserRepository } from './repositories/userRepository';
import { CreateUserBody } from './dtos/create-user-body';
@Controller('api')
export class AppController {
  constructor(
    private userRepository: UserRepository,
    private auth: Auth,
  ) {}

  @Post('adm/create-user')
  async createUser(@Body() createUserData: CreateUserBody) {
    const { cargo, cpf, name, passwd } = createUserData;
    cargo;
    return await this.userRepository.create({ cpf, name, passwd });
  }

  //loga e retorna access token
  @Post('auth/login')
  async login(@Body() userData: { cpf?: string; password: string }) {
    return this.auth.validarUsuario(userData.cpf, userData.password);
  }
}
