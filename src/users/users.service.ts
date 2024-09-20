import { PrismaService } from "./../prisma.service";
import { Injectable } from "@nestjs/common";

export type User = {
  id: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.prismaService.user.findFirst({
      where: { username },
    });
  }
}
