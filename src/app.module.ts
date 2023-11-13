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
} from './repositories/prisma';
import { UserRepository } from './repositories/userRepository';
import { ProfileRepository } from './repositories/profileRepository';
import { UserProfileRepository } from './repositories/userProfileRepository';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AuthController],
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: ProfileRepository, useClass: PrismaProfileRepository },
    { provide: UserProfileRepository, useClass: PrismaUserProfileRepository },
    AuthService,
    JwtService,
  ],
})
export class AppModule {}
