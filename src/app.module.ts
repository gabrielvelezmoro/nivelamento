import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserRepository } from './repositories/userRepository';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PrismaUserRepository } from './repositories/prisma/primaUserRepository';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AuthController],
  providers: [
    { provide: UserRepository, useClass: PrismaUserRepository },
    PrismaService,
    AuthService,
  ],
})
export class AppModule {}
