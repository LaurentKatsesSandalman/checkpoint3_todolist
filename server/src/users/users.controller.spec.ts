import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { OwnerGuard } from 'src/common/guards/owner.guard';

// Mock service
const mockUsersService = () => ({
  saveUser: jest.fn(),
  deleteUser: jest.fn(),
});

// Mock guards to bypass actual authentication/authorization
const mockAuthGuard = {
  canActivate: jest.fn(() => true),
};
const mockOwnerGuard = {
  canActivate: jest.fn(() => true),
};

describe('Testing of UsersController', () => {
  let controller: UsersController;
  let service: ReturnType<typeof mockUsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useFactory: mockUsersService }],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue(mockAuthGuard)
      .overrideGuard(OwnerGuard)
      .useValue(mockOwnerGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should call UsersService.saveUser with correct DTO', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        password: 'Password123!',
      };
      service.saveUser.mockResolvedValue({ id: 1, ...dto });

      const result = await controller.createUser(dto);

      expect(service.saveUser).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: 1, ...dto });
    });
  });

  describe('deleteUserById', () => {
    it('should call UsersService.deleteUser with numeric id', async () => {
      service.deleteUser.mockResolvedValue(true);

      const result = await controller.deleteUserById('42');

      expect(service.deleteUser).toHaveBeenCalledWith(42);
      expect(result).toBe(true);
    });

    it('should throw an error if id is not a number', () => {
      expect(() => controller.deleteUserById('abc')).toThrow('Invalid user id');
    });
  });
});
