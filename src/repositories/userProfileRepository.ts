export abstract class UserProfileRepository {
  abstract createUserProfile(request: ICreateUserProfileRequest): Promise<void>;
}

export interface ICreateUserProfileRequest {
  id_user: number;
  id_profile: number;
}
