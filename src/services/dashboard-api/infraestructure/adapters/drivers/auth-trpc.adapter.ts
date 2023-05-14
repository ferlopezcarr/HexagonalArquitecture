import { initTRPC } from "@trpc/server";
import { RegisterSchema, AuthenticatedUserSchema } from "../../../domain";
import { AuthService } from "../../../app/auth.service";

export function AuthTRPCAdapter(
  authService: AuthService,
  t: ReturnType<typeof initTRPC.create>
) {
  return t.router({
    login: t.procedure
      .input(RegisterSchema.pick({ email: true, password: true }))
      .output(AuthenticatedUserSchema)
      .mutation(({ input }) => authService.login(input.email, input.password)),
    register: t.procedure
      .input(RegisterSchema)
      .output(AuthenticatedUserSchema)
      .mutation(({ input }) => authService.register(input)),
  });
}
