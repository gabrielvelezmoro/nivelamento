import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async validarUsuario(cpf: string, password: string): Promise<any> {
    const user = await this.usersService.user(cpf);
    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }
    if (user.passwd === password) {
      return await this.gerarToken(cpf);
    }
    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }

  async gerarToken(cpf: string) {
    return {
      access_token: this.jwtService.sign(
        { cpf },
        {
          secret: 'agpr5',
          expiresIn: '12h',
        },
      ),
    };
  }
}
