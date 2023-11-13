import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../repositories/userRepository';
import { PrismaUserRepository } from '../repositories/prisma/prismaUserRepository';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    JwtService,
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
})
export class AuthModule {}
