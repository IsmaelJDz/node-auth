// patter adapter

import { compareSync, hashSync } from "bcryptjs";

export class BcryptAdapter {
  static hash(password: string): string {
    return hashSync(password, 8);
  }

  static compare(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }
}
