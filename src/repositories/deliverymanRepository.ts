export abstract class DeliverymanRepository {
  abstract listAllDeliveryman(): Promise<IListAllDeliverymanResponse>;
  abstract getDeliverymanById(
    request: IGetDeliverymanByIdRequest,
  ): Promise<IGetDeliverymanByIdResponse>;
  abstract updateDeliveryman(request: IUpdateDeliverymanRequest): Promise<void>;
  abstract deleteDeliverymanById(
    request: IDeleteDeliverymanRequest,
  ): Promise<void>;
}

interface IDeliveryMan {
  id: number;
  name: string;
  cpf: string;
}

export interface IListAllDeliverymanResponse {
  deliveryman: IDeliveryMan[];
}
export interface IGetDeliverymanByIdRequest {
  id: number;
  name: string;
  cpf: string;
}

export interface IGetDeliverymanByIdResponse {
  id: number;
  name: string;
  cpf: string;
}

export interface IUpdateDeliverymanRequest {
  name: string;
  cpf: string;
}

export interface IDeleteDeliverymanRequest {
  id: number;
}
