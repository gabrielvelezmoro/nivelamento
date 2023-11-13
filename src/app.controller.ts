import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService as Auth } from './auth/auth.service';
import { UserRepository } from './repositories/userRepository';
import { ProfileRepository } from './repositories/profileRepository';
import { UserProfileRepository } from './repositories/userProfileRepository';
import { CreateUserBody, CreateUserProfileBody } from './dtos';
@Controller('api')
export class AppController {
  constructor(
    private userRepository: UserRepository,
    private profileRepository: ProfileRepository,
    private userProfileRepository: UserProfileRepository,
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

  @Patch('adm/update-profile')
  async updateUserProfile(@Body() data: CreateUserProfileBody) {
    const { id_profile, id_user } = data;
    return this.userProfileRepository.createUserProfile({
      id_profile,
      id_user,
    });
  }
  //loga e retorna access token
  @Post('auth/login')
  async login(@Body() userData: { cpf?: string; password: string }) {
    return this.auth.validarUsuario(userData.cpf, userData.password);
  }
}
