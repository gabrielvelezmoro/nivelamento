import { PrismaService } from 'src/database/prisma.service';
import {
  DeliverymanRepository,
  IDeleteDeliverymanRequest,
  IGetDeliverymanByIdRequest,
  IGetDeliverymanByIdResponse,
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
        include: {
          UserProfile: { where: { profile: { ds_profile: 'Entregador' } } },
        },
      });

      return { deliveryman: result };
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  getDeliverymanById(
    request: IGetDeliverymanByIdRequest,
  ): Promise<IGetDeliverymanByIdResponse> {
    try {
      return;
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  updateDeliveryman(request: IUpdateDeliverymanRequest): Promise<void> {
    try {
      return;
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  deleteDeliverymanById(request: IDeleteDeliverymanRequest): Promise<void> {
    try {
      return;
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
