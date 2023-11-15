export abstract class ProfileRepository {
  abstract createProfile(request: ICreateProfileRequest): Promise<void>;
  abstract getProfileByDs(
    request: IGetProfileByDsRequest,
  ): Promise<IGetProfileByDsResponse>;
  abstract listAllProfiles(): Promise<IListProfileResponse>;
}

export interface ICreateProfileRequest {
  descricao: string;
}
export interface IGetProfileByDsRequest {
  ds_profile: string;
}
export interface IGetProfileByDsResponse {
  id: number;
  ds_profile: string;
}

export interface IListProfileResponse {
  profiles: IGetProfileByDsResponse[];
}
