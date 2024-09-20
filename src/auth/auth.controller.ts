import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthSignInDto } from "./dto/auth.dto";
import { AuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signIn: AuthSignInDto) {
    return this.authService.signIn(signIn.username, signIn.password);
  }

  @UseGuards(AuthGuard)
  @Get("encrypt-password")
  async getEncryptedPassword(@Query("password") password: string) {
    return this.authService.getEncryptedPassword(password);
  }
}
