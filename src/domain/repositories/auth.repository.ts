import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { LoginEntity } from "../entities/login.entity";
import { UserEntity } from "../entities/user.entity";

// Quienes se van a comunicar con nuestros datasources
// son los que vamos a usar para conectar a nuestros datasources

export abstract class AuthRepository {
  constructor() {}

  abstract loginUser(loginUserDto: LoginUserDto): Promise<LoginEntity>;
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
