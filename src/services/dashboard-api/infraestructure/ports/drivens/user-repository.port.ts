import { ExternalUser } from "../../../../repository/app/schemas";
import { User } from "../../../domain";

export interface UserRepositoryPort {
  getUser(email: string): Promise<ExternalUser>;
  createUser(user: User): Promise<ExternalUser>;
}
