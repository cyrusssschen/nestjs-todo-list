import {
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  private saltOrRounds = 10;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    password: string
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user || !(await this.verifyPassword(password, user.password!))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getEncryptedPassword(password: string): Promise<string> {
    try {
      const encrypted_password = await bcrypt.hash(password, this.saltOrRounds);
      return encrypted_password;
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }

  async verifyPassword(
    plaintext_password: string,
    encrypted_password: string
  ): Promise<boolean> {
    try {
      const result = await bcrypt.compare(
        plaintext_password,
        encrypted_password
      );

      return result;
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }
}
