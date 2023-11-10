import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { AuthService as Auth } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly auth: Auth,
  ) {}

  @Post('signup')
  async signupUser(@Body() userData: UserModel): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Post('signin')
  async(
    @Body() userData: { cpf?: string; password: string },
  ): Promise<UserModel> {
    return this.auth.validarUsuario(userData.cpf, userData.password);
  }
}
