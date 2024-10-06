import { Test } from "@nestjs/testing";
import { TodoListResolver } from "./todo-list.resolver";
import { PrismaService } from "../prisma/prisma.service";
import { AuthGuard } from "../../modules/auth/auth.guard";

describe("TodoListResolver", () => {
  let resolver: TodoListResolver;
  let prisma: PrismaService;
  const oneTodoItem = {
    id: 1,
    content: "todo item content",
  };
  const todoItemArray = [
    {
      id: 1,
      content: "1st todo item content",
    },
    {
      id: 2,
      content: "2nd todo item content",
    },
  ];

  const db = {
    todoItem: {
      findMany: jest.fn().mockResolvedValue(todoItemArray),
      findUnique: jest.fn().mockResolvedValue(oneTodoItem),
      create: jest.fn().mockReturnValue(oneTodoItem),
      save: jest.fn(),
      update: jest.fn().mockResolvedValue(oneTodoItem),
      delete: jest.fn().mockResolvedValue(oneTodoItem),
    },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TodoListResolver,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    prisma = module.get<PrismaService>(PrismaService);
    resolver = module.get(TodoListResolver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("resolver should be defined", () => {
    expect(resolver).toBeDefined();
  });

  describe("getTodoList", () => {
    it("should get the todo list array", async () => {
      const results = await resolver.getTodoList();
      expect(results).toEqual(todoItemArray);
    });
  });

  describe("queryTodoItemById", () => {
    it("should get todo item by query ID", async () => {
      const result = await resolver.queryTodoItemById(1);
      expect(result).toEqual(oneTodoItem);
    });
  });

  describe("createTodoItem", () => {
    it("should create new todo item", async () => {
      const result = await resolver.createTodoItem({
        content: oneTodoItem.content,
      });
      expect(result).toEqual(expect.objectContaining(oneTodoItem));
    });
  });

  describe("updateTodoItem", () => {
    it("should update the specific todo item", async () => {
      const result = await resolver.updateTodoItem(oneTodoItem);
      expect(result).toEqual(expect.objectContaining(oneTodoItem));
    });
  });

  describe("deleteTodoItem", () => {
    it("should delete the specific todo item by id and return correct result", async () => {
      const id = oneTodoItem.id;
      const result = await resolver.deleteTodoItem(id);
      expect(result).toEqual({
        id,
        result: true,
      });
    });
  });
});
