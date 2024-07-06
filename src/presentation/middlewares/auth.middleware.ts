import { NextFunction, Request, Response } from "express";
import { JWTAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

export class AuthMiddleware {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization") as string;

    if (!authorization) {
      return res.status(401).json({ message: "Token is required" });
    }

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JWTAdapter.verifyToken<{ id: string }>(token);
      if (!payload) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const user = await UserModel.findById(payload.id);

      if (!user) {
        return res.status(500).json({ message: "User not found" }); // on production, show a generic message
      }

      req.body.user = user;
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
