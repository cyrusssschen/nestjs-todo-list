import { Body, Controller, Delete, Get, Post, Param } from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateTodoItem } from "./common/dto/todo-list-create.dto";
import { UpdateTodoItem } from "./common/dto/todo-list-update.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("todo list")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("query")
  async queryTodoList() {
    return this.appService.queryTodoList();
  }

  @Post("create")
  async createTodoList(@Body() createTodoItem: CreateTodoItem) {
    return this.appService.createTodoList(createTodoItem);
  }

  @Post("update")
  async updateTodoList(@Body() updateTodoItem: UpdateTodoItem) {
    return this.appService.updateTodoList(updateTodoItem);
  }

  @Delete("delete/:id")
  async deleteTodoItem(@Param("id") id: string) {
    return this.appService.deleteTodoItem(+id);
  }
}
