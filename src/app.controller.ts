import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthService as Auth } from './auth/auth.service';
import {
  UserRepository,
  ProfileRepository,
  UserProfileRepository,
  DeliverymanRepository,
} from './repositories';
import { CreateUserBody, CreateUserProfileBody } from './dtos';
@Controller('api')
export class AppController {
  constructor(
    private userRepository: UserRepository,
    private profileRepository: ProfileRepository,
    private userProfileRepository: UserProfileRepository,
    private auth: Auth,
    private deliverymanRepository: DeliverymanRepository,
  ) {}

  @Post('adm/create-user')
  async createUser(@Body() createUserData: CreateUserBody) {
    const { cpf, name, passwd } = createUserData;
    return await this.userRepository.create({ cpf, name, passwd });
  }

  //cria perfil de acesso
  @Post('adm/create-profile')
  async createProfile(@Body() data: { descricao: string }) {
    const { descricao } = data;
    return this.profileRepository.createProfile({ descricao });
  }

  //lista perfis de acesso
  @Get('adm/profiles')
  async getProfiles() {
    return this.profileRepository.listAllProfiles();
  }

  @Patch('adm/update-profile')
  async updateUserProfile(@Body() data: CreateUserProfileBody) {
    const { id_profile, id_user } = data;
    return this.userProfileRepository.createUserProfile({
      id_profile,
      id_user,
    });
  }
  //loga e retorna access token
  @Post('auth/login')
  async login(@Body() userData: { cpf?: string; password: string }) {
    return this.auth.validarUsuario(userData.cpf, userData.password);
  }

  @Get('adm/users')
  async getUsers() {
    return this.userRepository.listAllUsersWithProfiles();
  }

  //CRUD ENTREGADOR

  @Post('adm/deliveryman/create')
  async createEntregador(@Body() createUserData: CreateUserBody) {
    const { cpf, name, passwd } = createUserData;

    const response = this.userRepository
      .create({ cpf, name, passwd })
      .then(async () => {
        const user = await this.userRepository.getUserByCPF(cpf);
        const entregadorProfile = await this.profileRepository.getProfileByDs({
          ds_profile: 'Entregador',
        });
        this.userProfileRepository.createUserProfile({
          id_user: user.id,
          id_profile: entregadorProfile.id,
        });
      });
    return response;
  }

  @Get('adm/deliveryman/list-all')
  async listAllEntregadores() {
    return this.deliverymanRepository.listAllDeliveryman();
  }
  @Get('adm/deliveryman/:id')
  async getEntregadoresById(@Param() param): Promise<any> {
    const { id } = param;
    return this.deliverymanRepository.getDeliverymanById({ id });
  }

  @Put('adm/deliveryman/update/:id')
  async updateEntregador(@Param() param, @Body() body) {
    const { id } = param;
    const { cpf, name } = body;
    return this.deliverymanRepository.updateDeliveryman({ id, cpf, name });
  }

  @Delete('adm/deliveryman/remove/:id')
  async getEntregadores(@Param() param) {
    const { id } = param;

    return this.deliverymanRepository.deleteDeliverymanById(Number(id));
  }
}
