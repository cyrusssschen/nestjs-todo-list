import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./common/prisma/prisma.service";
import { CreateTodoItem } from "./common/dto/todo-list-create.dto";
import { UpdateTodoItem } from "./common/dto/todo-list-update.dto";

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

  async deleteTodoItem(id: number) {
    try {
      return this.prismaService.todoItem.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new NotFoundException(error);
    }
  }
}
