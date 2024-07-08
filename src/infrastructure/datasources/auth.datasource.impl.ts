import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import {
  AuthDataSource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;

export class AuthDataSourceImpl extends AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {
    super();
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    const emailIsAlreadyInUse = await UserModel.findOne({ email });

    if (emailIsAlreadyInUse) {
      throw CustomError.conflict("Email is already in use"); // this message error is not recommended on production
    }

    try {
      const user = await UserModel.create({
        name,
        email,
        //password: BcryptAdapter.hash(password),
        password: this.hashPassword(password),
      });

      await user.save();

      return UserMapper.userEntityFromObject(user);

      //return new UserEntity(user.id, name, email, user.password, user.roles);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServerError();
    }
  }

  async loginUser(loginUserDto: RegisterUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw CustomError.notFound("User not found"); // this message error is not recommended on production
    }

    const isPasswordValid = this.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw CustomError.unauthorized("Invalid password"); // this message error is not recommended on production
    }

    try {
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServerError();
    }
  }
}
