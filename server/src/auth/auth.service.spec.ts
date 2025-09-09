import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../users/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const mockUsersService = {
  getUserByEmail: jest.fn(),
  saveUser: jest.fn(),
};

const mockConfigService = {
  get: jest.fn((key: string) => {
    switch (key) {
      case 'JWT_SECRET':
        return 'test-secret';
      case 'JWT_EXPIRES_IN':
        return '3600';
      default:
        return null;
    }
  }),
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('test-jwt-token'),
};

describe('Testing of AuthService', () => {
  let service: AuthService;
  let usersService: typeof mockUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService }, //usevalue instead of usefactory
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should call usersService.getUserByEmail with correct email parameter and return user only if email matches ', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        password: 'Password123!',
      };
      const emailParam = 'test@example.com';
      const badEmailParam = 'pipo@example.com';

      usersService.getUserByEmail.mockImplementation(async (email: string) => {
        if (email === dto.email) {
          return Promise.resolve({ id: 1, ...dto });
        }
        return Promise.resolve(null);
      });

      const result = await service.validateUser(emailParam);
      const badResult = await service.validateUser(badEmailParam);

      expect(usersService.getUserByEmail).toHaveBeenCalledWith(emailParam);
      expect(result).toEqual({ id: 1, ...dto });
      expect(usersService.getUserByEmail).toHaveBeenCalledWith(badEmailParam);
      expect(badResult).toEqual(null);
    });
  });

  describe('registerUser', () => {
    it('should call usersService.saveUser with correct DTO', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        password: 'Password123!',
      };
      usersService.saveUser.mockResolvedValue({ id: 1, ...dto });

      const result = await service.registerUser(dto);

      expect(usersService.saveUser).toHaveBeenCalledWith(dto);
      expect(result.email).toEqual('test@example.com');
    });
  });

  describe('loginUser', () => {
    it('should call validateUser with correct parameter email', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        password: 'Password123!',
      };

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      usersService.getUserByEmail.mockResolvedValue({
        id: 1,
        ...dto,
        password: hashedPassword,
      });

      await service.loginUser(dto);

      expect(usersService.getUserByEmail).toHaveBeenCalledWith(dto.email);
    });
    it('should throw UnauthorizedException(Invalid credentials) if userdata doesnt exist', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        password: 'Password123!',
      };
      usersService.getUserByEmail.mockResolvedValue(null);

      const result = service.loginUser(dto);

      await expect(result).rejects.toBeInstanceOf(UnauthorizedException);
      await expect(result).rejects.toThrow('Invalid credentials');
    });
    it('should throw UnauthorizedException(Invalid credentials) if password dont match', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        password: 'WrongPassword!',
      };

      const hashedPassword = await bcrypt.hash('CorrectPassword!', 10);

      const userData = {
        id: 1,
        email: dto.email,
        password: hashedPassword,
      };

      usersService.getUserByEmail.mockResolvedValue(userData);

      const result = service.loginUser(dto);

      await expect(result).rejects.toBeInstanceOf(UnauthorizedException);
      await expect(result).rejects.toThrow('Invalid credentials');
    });
    it('should return {expires_in: jwtExpiresIn, access_token: accessToken}', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        password: 'Password123!',
      };

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const userData = {
        id: 1,
        email: dto.email,
        password: hashedPassword,
      };

      usersService.getUserByEmail.mockResolvedValue(userData);

      const result = await service.loginUser(dto);

      expect(result).toHaveProperty('expires_in');
      expect(result).toHaveProperty('access_token');
      expect(typeof result.expires_in).toBe('number');
      expect(typeof result.access_token).toBe('string');
    });
  });
});
