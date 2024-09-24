import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe("AuthController", () => {
    it("should be defined", () => {
      expect(controller).toBeDefined();
    });

    it("signIn - should return valid token", async () => {
      const result = { access_token: "valid token" };
      authService.signIn = jest.fn().mockReturnValueOnce(result);

      expect(
        await controller.signIn({
          username: "username",
          password: "password",
        })
      ).toStrictEqual(result);
    });

    it("getEncryptedPassword - should return encrypted password", async () => {
      const encrypted_password =
        "$2b$10$8UQKzdW1cHTA8Qk3MclK.OHnEJ6b0qudW4UpUENBhJX.Q1rBMc3cK";
      authService.getEncryptedPassword = jest
        .fn()
        .mockReturnValueOnce(encrypted_password);

      const result = await controller.getEncryptedPassword("abc");
      expect(result).toStrictEqual(encrypted_password);
    });
  });
});
