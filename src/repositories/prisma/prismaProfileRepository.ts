import { PrismaService } from 'src/database/prisma.service';
import {
  ProfileRepository,
  ICreateProfileRequest,
  IGetProfileByDsRequest,
  IGetProfileByDsResponse,
  IListProfileResponse,
} from '../profileRepository';
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

  async getProfileByDs(
    request: IGetProfileByDsRequest,
  ): Promise<IGetProfileByDsResponse> {
    const { ds_profile } = request;
    const response = await this.prisma.profile
      .findFirst({
        where: { ds_profile },
      })
      .catch(() => {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      });
    return response;
  }

  async listAllProfiles(): Promise<IListProfileResponse> {
    const response = await this.prisma.profile.findMany().catch(() => {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    });
    return { profiles: response };
  }
}
