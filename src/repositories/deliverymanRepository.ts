export abstract class DeliverymanRepository {
  abstract listAllDeliveryman(): Promise<IListAllDeliverymanResponse>;
  abstract getDeliverymanById(IGetDeliverymanByIdRequest): Promise<any>;
  abstract updateDeliveryman(request: IUpdateDeliverymanRequest): Promise<void>;
  abstract deleteDeliverymanById(id: number): Promise<void>;
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
  id: string;
}

export interface IGetDeliverymanByIdResponse {
  id: number;
  name: string;
  cpf: string;
}

export interface IUpdateDeliverymanRequest {
  id: string;
  name: string;
  cpf: string;
}
