import { PrismaService } from 'src/database/prisma.service';
import { IGetUserByCPF, UserRepository } from '../userRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    name,
    cpf,
    passwd,
  }: {
    name: string;
    cpf: string;
    passwd: string;
  }): Promise<void> {
    const hashedPasswd = await bcrypt.hash(passwd, 10);
    await this.prisma.user
      .create({
        data: { name, cpf, passwd: hashedPasswd },
      })
      .catch(() => {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      });
  }

  async getUserByCPF(cpf: string): Promise<IGetUserByCPF> {
    const result = this.prisma.user
      .findFirst({
        where: { cpf },
      })
      .catch(() => {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      });
    return result;
  }

  listAllUsersWithProfiles(): Promise<any> {
    const result = this.prisma.user
      .findMany({
        select: {
          name: true,
          UserProfile: {
            include: {
              profile: {
                select: {
                  ds_profile: true,
                },
              },
            },
          },
        },
        // include: {
        //   UserProfile: {
        //     include: { profile: { select: { ds_profile: true } } },
        //   },
        // },
      })
      .catch(() => {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      });
    return result;
  }
}
