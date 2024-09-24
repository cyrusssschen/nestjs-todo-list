import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "../prisma/prisma.service";
import { Inject, NotFoundException, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../auth/auth.guard";
import { CreateTodoItem } from "../dto/todo-list-create.dto";
import { UpdateTodoItem } from "../dto/todo-list-update.dto";

@Resolver()
export class TodoListResolver {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  @Query("getTodoList")
  @UseGuards(AuthGuard)
  async getTodoList() {
    return this.prismaService.todoItem.findMany();
  }

  @Query("queryTodoItemById")
  @UseGuards(AuthGuard)
  async queryTodoItemById(@Args("id") id: number) {
    return this.prismaService.todoItem.findUnique({
      where: {
        id,
      },
    });
  }

  @Mutation("createTodoItem")
  @UseGuards(AuthGuard)
  async createTodoItem(@Args("todoItem") todoItem: CreateTodoItem) {
    return this.prismaService.todoItem.create({
      data: todoItem,
      select: {
        id: true,
        content: true,
        createTime: true,
      },
    });
  }

  @Mutation("updateTodoItem")
  @UseGuards(AuthGuard)
  async updateTodoItem(@Args("todoItem") todoItem: UpdateTodoItem) {
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

  @Mutation("deleteTodoItem")
  async deleteTodoItem(@Args("id") id: number) {
    try {
      await this.prismaService.todoItem.delete({
        where: {
          id,
        },
      });
      return id;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
