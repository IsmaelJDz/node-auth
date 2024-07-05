import { CustomError, UserEntity } from "../../domain";

export class UserMapper {
  static userEntityFromObject(obj: { [key: string]: any }): UserEntity {
    const { id, _id, name, email, password, roles } = obj;

    if (!id || !_id) {
      throw CustomError.badRequest("User id is required");
    }

    if (!name) {
      throw CustomError.badRequest("User name is required");
    }

    if (!email) {
      throw CustomError.badRequest("User email is required");
    }

    if (!password) {
      throw CustomError.badRequest("User password is required");
    }

    if (!roles) {
      throw CustomError.badRequest("User roles is required");
    }

    return new UserEntity(id || _id, name, email, password, roles);
  }
}
