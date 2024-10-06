import { MinLength } from "class-validator";

export class AuthSignInDto {
  @MinLength(3, {
    message: "User length needs to be 3 digit at least",
  })
  username: string;

  @MinLength(6, {
    message: "Password length needs to be 6 digit at least",
  })
  password: string;
}
