import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appService: AppService;
  let appController: AppController;

  beforeEach(() => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  describe('queryTodoList', () => {
    it('should return an array of cats', async () => {
      const result = [
        {
          id: 1,
          content: 'test content',
          createTime: new Date(),
        },
      ];
      jest
        .spyOn(appService, 'queryTodoList')
        .mockImplementation(async () => result);

      expect(await appController.queryTodoList()).toBe(result);
    });
  });
});
