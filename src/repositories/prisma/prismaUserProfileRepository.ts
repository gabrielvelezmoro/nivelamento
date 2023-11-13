import { PrismaService } from 'src/database/prisma.service';
import {
  UserProfileRepository,
  ICreateUserProfileRequest,
} from '../userProfileRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserProfileRepository implements UserProfileRepository {
  constructor(private prisma: PrismaService) {}

  async createUserProfile(request: ICreateUserProfileRequest): Promise<void> {
    const { id_profile, id_user } = request;
    this.prisma.userProfile
      .create({
        data: { id_profile, id_user },
      })
      .catch(() => {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      });
  }
}
