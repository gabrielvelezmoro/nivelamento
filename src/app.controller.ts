import { Controller, Post, Body } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { AuthService as Auth } from './auth/auth.service';
import { UserRepository } from './repositories/userRepository';
import { CreateUserBody } from './dtos/UserDTO';
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

  // @Post('signup')
  // async signupUser(@Body() userData: UserModel): Promise<UserModel> {
  //   return this.userRepository.login(userData);
  // }

  @Post('signin')
  async(
    @Body() userData: { cpf?: string; password: string },
  ): Promise<UserModel> {
    return this.auth.validarUsuario(userData.cpf, userData.password);
  }
}
