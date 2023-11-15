export abstract class UserRepository {
  abstract create(request: ICreateUserRequest): Promise<void>;
  abstract getUserByCPF(cpf: string): Promise<IGetUserByCPFResponse>;
  abstract listAllUsersWithProfiles(): Promise<any>;
}

export interface ICreateUserRequest {
  name: string;
  cpf: string;
  passwd: string;
}

export interface IGetUserByCPFResponse {
  id: number;
  name: string;
  cpf: string;
  passwd: string;
}
