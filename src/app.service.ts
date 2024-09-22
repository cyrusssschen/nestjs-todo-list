import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { CreateTodoItem } from "./dto/todo-list-create.dto";
import { UpdateTodoItem } from "./dto/todo-list-update.dto";

@Injectable()
export class AppService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  async queryTodoList() {
    return this.prismaService.todoItem.findMany({
      select: {
        id: true,
        content: true,
        createTime: true,
      },
    });
  }

  async createTodoList(createTodoItem: CreateTodoItem) {
    return this.prismaService.todoItem.create({
      data: createTodoItem,
      select: {
        id: true,
        content: true,
        createTime: true,
      },
    });
  }

  async updateTodoList(updateTodoItem: UpdateTodoItem) {
    return this.prismaService.todoItem.update({
      where: {
        id: updateTodoItem.id,
      },
      data: updateTodoItem,
      select: {
        id: true,
        content: true,
        createTime: true,
      },
    });
  }

  async removeTodoList(id: number) {
    return this.prismaService.todoItem.delete({
      where: {
        id,
      },
    });
  }
}
