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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthSignInDto } from "./dto/auth.dto";
import { AuthGuard } from "./auth.guard";

@ApiTags("authentication")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ApiOperation({ summary: "Sign in" })
  @ApiResponse({ status: 200, description: "Success" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  signIn(@Body() signIn: AuthSignInDto) {
    return this.authService.signIn(signIn.username, signIn.password);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get("password/encrypt")
  @ApiOperation({ summary: "Fetch encrypted password" })
  @ApiResponse({ status: 200, description: "Success" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async getEncryptedPassword(@Query("password") password: string) {
    return this.authService.getEncryptedPassword(password);
  }
}
