import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserRepository } from './repositories/user-repository';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService,{provide: UserRepository, useClass: PrismaUserRepository } UserService, PrismaService, AuthService],
})
export class AppModule {}
