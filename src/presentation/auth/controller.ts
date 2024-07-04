import { Request, Response } from "express";
import { AuthRepository, RegisterUserDto } from "../../domain";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    this.authRepository
      .register(registerUserDto!)
      .then(user => res.json(user))
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  };

  loginUser = (req: Request, res: Response) => {
    res.json({ message: "Login route controller" });
  };
}
