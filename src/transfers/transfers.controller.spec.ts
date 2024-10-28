import { Test, TestingModule } from '@nestjs/testing';
import { TransfersController } from './transfers.controller';
import { TransfersService } from './transfers.service';
import { UsersService } from "../users/users.service";

describe('TransfersController', () => {
  let controller: TransfersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransfersController],
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

    controller = module.get<TransfersController>(TransfersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
