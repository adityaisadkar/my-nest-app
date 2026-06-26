import { Test, TestingModule } from '@nestjs/testing';
import { NewStudentService } from './new-student.service';

describe('NewStudentService', () => {
  let service: NewStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewStudentService],
    }).compile();

    service = module.get<NewStudentService>(NewStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
