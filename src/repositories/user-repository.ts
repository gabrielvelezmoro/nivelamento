export abstract class UserRepository {
  abstract createUser(request: ICreateUserRequest): Promise<void>;
}

export interface ICreateUserRequest {
  id: number;
  nome: string;
  cpf: string;
  profile: 'ADM' | 'Entregador';
}
