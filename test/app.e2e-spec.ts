import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/common/prisma/prisma.service";
import { CreateTodoItem } from "../src/common/dto/todo-list-create.dto";

describe("Todo list service app controller (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let todoItem: CreateTodoItem;

  const todoItemShape = expect.objectContaining({
    id: expect.any(Number),
    content: expect.any(String),
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    await app.init();

    todoItem = await prisma.todoItem.create({
      data: {
        content: "1st testing todo item",
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("GET /query", () => {
    it("should return a list of todo list", async () => {
      const { status, body } = await request(app.getHttpServer()).get("/query");

      expect(status).toBe(200);
      expect(body).toStrictEqual(expect.arrayContaining([todoItemShape]));
    });
  });

  describe("DELETE /delete/:id", () => {
    it("should remove the specific todo item", async () => {
      const { status, body } = await request(app.getHttpServer()).delete(
        `/delete/${todoItem.id}`
      );

      expect(status).toBe(200);
      expect(body).toStrictEqual(todoItemShape);
    });
  });
});
