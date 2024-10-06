import { MaxLength, MinLength } from "class-validator";
export class CreateTodoItem {
  @MinLength(5, {
    message: "Minimum length of content is 5 characters",
  })
  @MaxLength(1000, {
    message: "Content length cannot exceed 1000 characters",
  })
  content: string;
}
