import { describe, expect, it } from "vitest";
import { AuthService } from "./auth.service";
import { AuthenticatedUser, User } from "../domain";
import {
  AuthRepositoryAdapter,
  UserRepositoryAdapter,
} from "../infraestructure/adapters/drivens";

describe("AuthService", () => {
  const controlAuthenticatorStub = new AuthRepositoryAdapter();
  const repoQuerierStub = new UserRepositoryAdapter();
  const dashboardApiMock = new AuthService(
    controlAuthenticatorStub,
    repoQuerierStub
  );

  it.concurrent("should login", async () => {
    //GIVEN
    const mockedParams = {
      email: "john@gmail.com",
      password: "12345678",
    };

    const expectedResult: AuthenticatedUser = {
      id: "1",
      name: "John Doe",
      email: "john@gmail.com",
      token: "token",
      refreshToken: "refreshToken",
      permissions: {
        admin: true,
        user: true,
      },
    };

    //WHEN
    const result = await dashboardApiMock.login(
      mockedParams.email,
      mockedParams.password
    );

    //THEN
    expect(result).toEqual(expectedResult);
  });

  it.concurrent("should register", async () => {
    //GIVEN

    const mockedUser: User = {
      name: "John",
      email: "john@gmail.com",
      password: "password",
    };

    const expectedResult: AuthenticatedUser = {
      id: "1",
      name: "John Doe",
      email: "john@gmail.com",
      token: "token",
      refreshToken: "refreshToken",
      permissions: {
        admin: true,
        user: true,
      },
    };

    //WHEN
    const result = await dashboardApiMock.register(mockedUser);

    //THEN
    expect(result).toEqual(expectedResult);
  });
});
