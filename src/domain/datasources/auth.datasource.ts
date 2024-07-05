import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

// datasources son las reglas de negocio que van a regir la obtención de datos

export abstract class AuthDataSource {
  // abstract loginUser(): Promise<UserEntity>;
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
