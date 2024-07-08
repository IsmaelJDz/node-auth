import { Request, Response } from "express";
import { UserModel } from "../../data/mongodb";
import {
  AuthRepository,
  CustomError,
  LoginUser,
  LoginUserDto,
  RegisterUser,
  RegisterUserDto,
} from "../../domain";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then(userToken => res.json(userToken))
      .catch(error => this.handleError(error, res));

    // this.authRepository
    //   .register(registerUserDto!)
    //   .then(async user => {
    //     res.json({
    //       user,
    //       token: await JWTAdapter.generateToken({ id: user.id }),
    //     });
    //   })
    //   .catch(error => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.login(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then(user => res.json(user))
      .catch(error => this.handleError(error, res));
  };

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then(users =>
        res.json({
          // users,
          user: req.body.user,
        })
      )
      .catch(error => this.handleError(error, res));
  };
}
