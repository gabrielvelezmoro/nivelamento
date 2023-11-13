export abstract class ProfileRepository {
  abstract createProfile(request: ICreateProfileRequest): Promise<void>;
}

export interface ICreateProfileRequest {
  descricao: string;
}
