import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateTodoList } from './dto/todo-list-create.dto';
import { UpdateTodoList } from './dto/todo-list-update.dto';

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

  async createTodoList(todoItem: CreateTodoList) {
    return this.prismaService.todoItem.create({
      data: todoItem,
      select: {
        id: true,
        content: true,
        createTime: true,
      },
    });
  }

  async updateTodoList(todoItem: UpdateTodoList) {
    return this.prismaService.todoItem.update({
      where: {
        id: todoItem.id,
      },
      data: todoItem,
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
