import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty({ message: 'Nome obrigatório.' })
  name: string;

  @Length(5, 100, {
    message: 'Deve conter mais de 5 e menos de 100 caracteres',
  })
  @IsNotEmpty({ message: 'Password obrigatório.' })
  passwd: string;

  @IsNotEmpty({ message: 'CPF obrigatório.' })
  cpf: string;

  @IsNotEmpty({
    message: 'Deve se atribuir um cargo ao usuario. Seja ADM ou Entregador',
  })
  cargo: string;
}
