import { Test, TestingModule } from '@nestjs/testing';
import { NewStudentController } from './new-student.controller';

describe('NewStudentController', () => {
  let controller: NewStudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewStudentController],
    }).compile();

    controller = module.get<NewStudentController>(NewStudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
