import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateTodoItem } from "./common/dto/todo-list-create.dto";
import { UpdateTodoItem } from "./common/dto/todo-list-update.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("todo-list")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("query")
  async query() {
    return this.appService.queryTodoList();
  }

  @Post("create")
  async create(@Body() createTodoItem: CreateTodoItem) {
    return this.appService.createTodoList(createTodoItem);
  }

  @Put("update")
  async update(@Body() updateTodoItem: UpdateTodoItem) {
    return this.appService.updateTodoList(updateTodoItem);
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: string) {
    return this.appService.deleteTodoItem(+id);
  }
}
