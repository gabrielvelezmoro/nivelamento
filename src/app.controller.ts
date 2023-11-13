import { Controller, Post, Body } from '@nestjs/common';
import { AuthService as Auth } from './auth/auth.service';
import { UserRepository } from './repositories/userRepository';
import { ProfileRepository } from './repositories/profileRepository';
import { CreateUserBody } from './dtos/create-user-body';
@Controller('api')
export class AppController {
  constructor(
    private userRepository: UserRepository,
    private profileRepository: ProfileRepository,
    private auth: Auth,
  ) {}

  @Post('adm/create-user')
  async createUser(@Body() createUserData: CreateUserBody) {
    const { cargo, cpf, name, passwd } = createUserData;
    cargo;
    return await this.userRepository.create({ cpf, name, passwd });
  }

  //cria perfil de acesso
  @Post('adm/create-profile')
  async createProfile(@Body() data: { descricao: string }) {
    const { descricao } = data;
    return this.profileRepository.createProfile({ descricao });
  }

  //loga e retorna access token
  @Post('auth/login')
  async login(@Body() userData: { cpf?: string; password: string }) {
    return this.auth.validarUsuario(userData.cpf, userData.password);
  }
}
