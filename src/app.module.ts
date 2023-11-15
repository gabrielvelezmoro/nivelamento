import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaProfileRepository,
  PrismaUserProfileRepository,
  PrismaUserRepository,
  PrismaDeliverymanRepository,
} from './repositories/prisma';
import {
  UserRepository,
  ProfileRepository,
  UserProfileRepository,
  DeliverymanRepository,
} from './repositories';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AuthController],
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: ProfileRepository, useClass: PrismaProfileRepository },
    { provide: UserProfileRepository, useClass: PrismaUserProfileRepository },
    { provide: DeliverymanRepository, useClass: PrismaDeliverymanRepository },
    AuthService,
    JwtService,
  ],
})
export class AppModule {}
