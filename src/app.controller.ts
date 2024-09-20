import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateTodoList } from "./dto/todo-list-create.dto";
import { UpdateTodoList } from "./dto/todo-list-update.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("create")
  async createTodoList(@Body() todoItem: CreateTodoList) {
    return this.appService.createTodoList(todoItem);
  }

  @Post("update")
  async updateTodoList(@Body() todoItem: UpdateTodoList) {
    return this.appService.updateTodoList(todoItem);
  }

  @Get("delete")
  async deleteTodoList(@Query("id") id: number) {
    return this.appService.removeTodoList(+id);
  }

  @Get("query")
  async queryTodoList() {
    return this.appService.queryTodoList();
  }
}
