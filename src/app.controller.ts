import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateTodoItem } from "./dto/todo-list-create.dto";
import { UpdateTodoItem } from "./dto/todo-list-update.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("todo list")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("create")
  async createTodoList(@Body() createTodoItem: CreateTodoItem) {
    return this.appService.createTodoList(createTodoItem);
  }

  @Post("update")
  async updateTodoList(@Body() updateTodoItem: UpdateTodoItem) {
    return this.appService.updateTodoList(updateTodoItem);
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
