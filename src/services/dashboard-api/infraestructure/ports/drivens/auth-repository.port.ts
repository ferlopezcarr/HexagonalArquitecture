import { AuthDetails } from "../../../domain";

export interface AuthRepositoryPort {
  getAuthDetails(email: string, password: string): Promise<AuthDetails>;
  getPermissions(email: string, password: string): Promise<Permissions>;
}
