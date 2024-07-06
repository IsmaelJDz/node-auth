import { Request, Response } from "express";
import { JWTAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";

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

    this.authRepository
      .register(registerUserDto!)
      .then(async user => {
        res.json({
          user,
          token: await JWTAdapter.generateToken({ id: user.id }),
        });
      })
      .catch(error => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    res.json({ message: "Login route controller" });
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
