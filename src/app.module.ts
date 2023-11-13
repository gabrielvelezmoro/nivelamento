import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserRepository } from './repositories/userRepository';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { PrismaUserRepository } from './repositories/prisma/primaUserRepository';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AuthController],
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    AuthService,
    JwtService,
  ],
})
export class AppModule {}
