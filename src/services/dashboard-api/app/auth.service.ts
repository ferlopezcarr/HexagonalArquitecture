import { AuthenticatedUser, User } from "../domain";
import { AuthRepositoryPort, UserRepositoryPort } from "../infraestructure/ports/drivens";
import { AuthGuiPort } from "../infraestructure/ports/drivers";


export class AuthService implements AuthGuiPort {
  constructor(
    private readonly authRepositoryPort: AuthRepositoryPort,
    private readonly userRepositoryPort: UserRepositoryPort
  ) {}

  async login(email: string, password: string): Promise<AuthenticatedUser> {
    const authDetails = await this.authRepositoryPort.getAuthDetails(
      email,
      password
    );
    const permissions = await this.authRepositoryPort.getPermissions(
      email,
      password
    );
    const user = await this.userRepositoryPort.getUser(email);
    const result = {
      ...user,
      ...authDetails,
      permissions,
    };

    console.log("LOGIN", result);

    return result;
  }

  async register(user: User): Promise<AuthenticatedUser> {
    const newUser = await this.userRepositoryPort.createUser(user);
    const authDetails = await this.authRepositoryPort.getAuthDetails(
      user.email,
      user.password
    );
    const permissions = await this.authRepositoryPort.getPermissions(
      user.email,
      user.password
    );

    const result = {
      ...newUser,
      ...authDetails,
      permissions,
    };

    console.log("REGISTER", result);

    return result;
  }
}
