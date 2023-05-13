import { AuthenticatedUser, User } from "../../../domain";

export interface AuthGuiPort {
  login: (email: string, password: string) => Promise<AuthenticatedUser>;
  register(user: User, password: string): Promise<AuthenticatedUser>;
}
