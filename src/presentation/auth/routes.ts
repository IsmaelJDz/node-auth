import { Router } from "express";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);

    const controller = new AuthController(authRepository);

    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    router.get("/", AuthMiddleware.validateToken, controller.getUsers);

    return router;
  }
}
