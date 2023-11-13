import { PrismaService } from 'src/database/prisma.service';
import { ProfileRepository, ICreateProfileRequest } from '../profileRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class PrismaProfileRepository implements ProfileRepository {
  constructor(private prisma: PrismaService) {}

  async createProfile(request: ICreateProfileRequest): Promise<void> {
    const { descricao } = request;
    await this.prisma.profile
      .create({
        data: { ds_profile: descricao },
      })
      .catch(() => {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      });
  }
}
