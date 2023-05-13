import { ExternalUser } from "../../../../repository/app/schemas";
import { User } from "../../../domain";
import { UserRepositoryPort } from "../../ports/drivens";

const userMock: ExternalUser = {
  id: "1",
  name: "John Doe",
  email: "john@gmail.com",
};

export class UserRepositoryAdapter implements UserRepositoryPort {
  getUser(_email: string): Promise<ExternalUser> {
    return Promise.resolve(userMock);
  }

  createUser(_user: User): Promise<ExternalUser> {
    return Promise.resolve(userMock);
  }
}
