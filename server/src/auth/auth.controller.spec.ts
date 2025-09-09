import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/create-user.dto';
import type { User } from 'src/users/users.entity';

//Mock service
const mockAuthService = () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn(),
});

describe('testing of AuthController', () => {
  let controller: AuthController;
  let service: ReturnType<typeof mockAuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useFactory: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call Authservice.registerUser with correct DTO', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        password: 'Password123!',
      };

      const expectedUser: User = { id: 1, ...dto };
      service.registerUser.mockResolvedValue(expectedUser);

      const result = await controller.register(dto);

      expect(service.registerUser).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: 1, ...dto });
    });
  });

  describe('login', () => {
    it('should call AuthService.loginUser with correct DTO', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        password: 'Password123!',
      };

      await controller.login(dto);

      expect(service.loginUser).toHaveBeenCalledWith(dto);
    });
  });
});
