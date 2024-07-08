import { JWTAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JWTAdapter.generateToken
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    const user = await this.authRepository.loginUser(loginUserDto);

    if (!user) {
      throw CustomError.internalServerError("Error user not found"); // this message error is not recommended on production
    }

    const token = await this.signToken({ id: user.id }, "2h");

    if (!token) {
      throw CustomError.internalServerError("Error generating token");
    }

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
