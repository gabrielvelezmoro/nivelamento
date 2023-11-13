import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repositories/userRepository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserRepository,
    private jwtService: JwtService,
  ) {}
  async validarUsuario(cpf: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByCPF(cpf);

    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }

    const isMatch = await bcrypt.compare(password, user.passwd);

    if (isMatch) {
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
