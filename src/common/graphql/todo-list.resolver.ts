import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "../prisma/prisma.service";
import { Inject, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../modules/auth/auth.guard";
import { CreateTodoItem } from "../dto/todo-list-create.dto";
import { UpdateTodoItem } from "../dto/todo-list-update.dto";

@Resolver()
export class TodoListResolver {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  @Query("getTodoList")
  async getTodoList() {
    return this.prismaService.todoItem.findMany();
  }

  @Query("queryTodoItemById")
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
  @UseGuards(AuthGuard)
  async deleteTodoItem(@Args("id") id: number) {
    let result = false;
    try {
      await this.prismaService.todoItem.delete({
        where: {
          id,
        },
      });

      result = true;
    } catch (error) {
      console.error("delete error: ", error);
    }

    return {
      id,
      result,
    };
  }
}
