import { PrismaService } from "../../common/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { User } from "./users.types";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.prismaService.user.findFirst({
      where: { username },
    });
  }
}
