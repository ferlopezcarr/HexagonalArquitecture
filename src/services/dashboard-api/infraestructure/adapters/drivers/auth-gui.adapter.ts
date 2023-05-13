import { AuthService } from "../../../app/auth.service";
import { AuthenticatedUser, User } from "../../../domain";
import { AuthGuiPort } from "../../ports/drivers/auth-gui.port";

export class AuthGuiAdapter implements AuthGuiPort {
  constructor(private readonly authService: AuthService) {}
  async login(email: string, password: string): Promise<AuthenticatedUser> {
    return this.authService.login(email, password);
  }
  async register(user: User): Promise<AuthenticatedUser> {
    return this.authService.register(user);
  }
}
