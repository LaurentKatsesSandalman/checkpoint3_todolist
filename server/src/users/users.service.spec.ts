import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './create-user.dto';

// Mock repository
const mockUsersRepository = (): MockRepository => ({
  findOneBy: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

type MockRepository = {
  findOneBy: jest.Mock;
  save: jest.Mock;
  delete: jest.Mock;
};

describe('Testing of UsersService', () => {
  let service: UsersService;
  let repository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<MockRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserByEmail', () => {
    it('should return a user if found', async () => {
      const email = 'test@example.com';
      const user = { id: 1, email } as User;
      repository.findOneBy.mockResolvedValue(user);

      const result = await service.getUserByEmail(email);
      expect(repository.findOneBy).toHaveBeenCalledWith({ email });
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      repository.findOneBy.mockResolvedValue(null);

      const result = await service.getUserByEmail('missing@example.com');
      expect(result).toBeNull();
    });
  });

  describe('saveUser', () => {
    it('should save and return the user', async () => {
      const dto: CreateUserDto = {
        email: 'new@example.com',
        password: 'Password123!',
      };
      const savedUser: User = { id: 1, ...dto } as User;
      repository.save.mockResolvedValue(savedUser);

      const result = await service.saveUser(dto);
      expect(repository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(savedUser);
    });
  });

  describe('deleteUser', () => {
    it('should call repository.delete with the correct id', async () => {
      repository.delete.mockResolvedValue(undefined); // TypeORM delete returns DeleteResult, simplified here

      await service.deleteUser(42);
      expect(repository.delete).toHaveBeenCalledWith(42);
    });
  });
});
