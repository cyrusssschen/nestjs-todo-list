import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let appService: AppService;
  let appController: AppController;

  beforeEach(() => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  describe("query", () => {
    it("should return an array of todo list", async () => {
      const result = [
        {
          id: 1,
          content: "1st test content",
          createTime: new Date(),
        },
        {
          id: 2,
          content: "2nd test content",
          createTime: new Date(),
        },
      ];
      jest
        .spyOn(appService, "queryTodoList")
        .mockImplementation(async () => result);

      expect(await appController.query()).toBe(result);
    });
  });
});
