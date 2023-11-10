import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostService } from './post.service';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, PostService, UserService, PrismaService, AuthService],
})
export class AppModule {}
