import { ExecutionContext, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthGuard } from "./auth.guard";

const gqlMockFactory = (context: Record<string, any>): ExecutionContext =>
  ({
    getType: () => "graphql",
    getHandler: () => "query",
    getClass: () => "Test Class",
    getArgs: () => [{}, {}, context, {}],
    getArgByIndex: () => ({}) as any,
    switchToHttp: () => ({}) as any,
    switchToRpc: () => ({}) as any,
    switchToWs: () => ({}) as any,
  }) as any;

const createRequestHeader = (authorization: string) => {
  return {
    req: {
      headers: {
        authorization,
      },
    },
  };
};

describe("AuthGuard", () => {
  let guard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: async () => "valid user",
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(guard).toBeDefined();
  });

  it("should return true with valid token", async () => {
    const context = gqlMockFactory(
      createRequestHeader("Bearer valid-jwt-token")
    );

    expect(guard.canActivate(context)).toBeTruthy();
  });

  it.each(["", "Bearer "])(
    "should throw unauthorized exception without valid token",
    (authorization) => {
      const context = gqlMockFactory(createRequestHeader(authorization));

      expect(guard.canActivate(context)).rejects.toThrow(
        expect.objectContaining({
          status: HttpStatus.UNAUTHORIZED,
        })
      );
    }
  );
});
