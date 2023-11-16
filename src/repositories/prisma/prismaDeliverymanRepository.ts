import { PrismaService } from 'src/database/prisma.service';
import {
  DeliverymanRepository,
  IGetDeliverymanByIdRequest,
  IListAllDeliverymanResponse,
  IUpdateDeliverymanRequest,
} from '../deliverymanRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class PrismaDeliverymanRepository implements DeliverymanRepository {
  constructor(private prisma: PrismaService) {}

  async listAllDeliveryman(): Promise<IListAllDeliverymanResponse> {
    try {
      const result = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          cpf: true,
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
        where: {
          UserProfile: { some: { profile: { ds_profile: 'Entregador' } } },
        },
      });

      return { deliveryman: result };
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async getDeliverymanById(request: IGetDeliverymanByIdRequest): Promise<any> {
    try {
      const result = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          cpf: true,
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
        where: {
          id: Number(request.id),
          UserProfile: { some: { profile: { ds_profile: 'Entregador' } } },
        },
      });
      return result;
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async updateDeliveryman(request: IUpdateDeliverymanRequest): Promise<void> {
    try {
      await this.prisma.user.update({
        data: { cpf: request.cpf, name: request.name },
        where: { id: Number(request.id) },
      });
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async deleteDeliverymanById(id: number): Promise<void> {
    try {
      console.log(id);
      await this.prisma.user.delete({ where: { id: id } });
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
