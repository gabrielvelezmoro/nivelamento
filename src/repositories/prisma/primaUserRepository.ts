import { PrismaService } from 'src/database/prisma.service';
import {
  IGetUserByCPF,
  //   CustomerRepository,
  //   IGetBalanceRequest,
  //   IListAllResponse,
  //   IUpdateBalanceRequest,
  //   IGetBalanceResponse,
  //   IGetCustomerRequest,
  //   IGetCustomerResponse,
  //   IGetCustomerByNumberRequest,
  UserRepository,
} from '../userRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

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
    await this.prisma.user
      .create({
        data: { name, cpf, passwd },
      })
      .catch(() => {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      });
  }

  //   async listAll(): Promise<IListAllResponse[]> {
  //     const customers = await this.prisma.user.findMany().catch(() => {
  //       throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  //     });

  //     return customers;
  //   }

  //   async updateBalance(request: IUpdateBalanceRequest): Promise<void> {
  //     await this.prisma.user.update({
  //       data: { saldo: request.saldo },
  //       where: { id: request.id },
  //     });
  //   }

  async getUserByCPF(cpf: string): Promise<IGetUserByCPF> {
    const result = await this.prisma.user
      .findFirst({
        where: { cpf },
      })
      .catch(() => {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      });
    return result;
  }
}
