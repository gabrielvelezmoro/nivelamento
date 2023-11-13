export abstract class UserRepository {
  abstract create(request: ICreateUserRequest): Promise<void>;
  abstract getUserByCPF(cpf: string): Promise<IGetUserByCPF>;
}

export interface ICreateUserRequest {
  name: string;
  cpf: string;
  passwd: string;
}

export interface IGetUserByCPF {
  name: string;
  cpf: string;
  passwd: string;
}
