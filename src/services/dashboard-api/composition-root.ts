import { initTRPC } from "@trpc/server";
import {
  AuthRepositoryAdapter,
  UserRepositoryAdapter,
} from "./infraestructure/adapters/drivens";
import {
  AuthGuiAdapter,
  AuthTRPCAdapter,
} from "./infraestructure/adapters/drivers";
import { AuthService } from "./app/auth.service";

const compositionMock = () => {
  // DRIVENS
  const authRepositoryAdapter = new AuthRepositoryAdapter();
  const userRepositoryAdapter = new UserRepositoryAdapter();

  // APP
  const authService = new AuthService(
    authRepositoryAdapter,
    userRepositoryAdapter
  );

  // DRIVERS
  const authGuiAdapter = new AuthGuiAdapter(authService);

  return {
    authGuiAdapter,
  };
};

export const { authGuiAdapter } = compositionMock();
/* 
const registerMock = {
  name: "John",
  email: "jhon@gmail.com",
  password: "password",
};

authGuiAdapter.login("john@gmail.com", "12345678");
authGuiAdapter.register(registerMock);
 */
export const localTRPCCompose = () => {
  // DRIVENS
  const controlAuthenticatorStub = new AuthRepositoryAdapter();
  const repoQuerierStub = new UserRepositoryAdapter();

  // APP
  const authService = new AuthService(
    controlAuthenticatorStub,
    repoQuerierStub
  );

  // TRPC INSTANCE
  const t = initTRPC.create();

  // TRPC DRIVER
  const authTRPCAdapterRouter = AuthTRPCAdapter(authService, t);

  const appRouter = t.mergeRouters(authTRPCAdapterRouter);

  return { appRouter };
};

export const { appRouter } = localTRPCCompose();
