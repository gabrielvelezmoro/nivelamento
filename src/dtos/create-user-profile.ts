import { IsNotEmpty } from 'class-validator';

export class CreateUserProfileBody {
  @IsNotEmpty({ message: 'Id de usuario obrigatório.' })
  id_user: number;

  @IsNotEmpty({ message: 'Id de perfil obrigatório.' })
  id_profile: number;
}
