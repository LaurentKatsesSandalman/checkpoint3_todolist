import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { getDatabaseConfig } from '.././config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(getDatabaseConfig),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
