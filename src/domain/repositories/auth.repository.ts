import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

// Quienes se van a comunicar con nuestros datasources
// son los que vamos a usar para conectar a nuestros datasources

export abstract class AuthRepository {
  constructor() {}

  // abstract loginUser(): Promise<UserEntity>;
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
