import * as jwt from "jsonwebtoken";
import { envs } from "./envs";

export class JWTAdapter {
  static async generateToken(
    payload: Object,
    duration: string = "2h"
  ): Promise<string | null> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        envs.JWT_SECRET,
        { expiresIn: duration },
        (err, token) => {
          if (err) {
            return resolve(null);
          }
          resolve(token!);
        }
      );
    });
  }

  static async verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, envs.JWT_SECRET, (err, decoded) => {
        if (err) {
          return resolve(null);
        }
        resolve(decoded as T);
      });
    });
  }
}
