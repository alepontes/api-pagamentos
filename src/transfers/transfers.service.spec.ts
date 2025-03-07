import { Test, TestingModule } from '@nestjs/testing';
import { TransfersService } from './transfers.service';
import { UsersService } from '../users/users.service';

describe('TransfersService', () => {
  let service: TransfersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransfersService,
        {
          provide: UsersService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
            getById: jest.fn(),
            deposit: jest.fn(),
            withdraw: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransfersService>(TransfersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
