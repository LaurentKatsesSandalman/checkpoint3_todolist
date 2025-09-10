import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { getDatabaseConfig } from '.././config/database.config';
import { TasksModule } from 'src/tasks/tasks.module';
import { SubtasksModule } from 'src/subtasks/subtasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(getDatabaseConfig),
    UsersModule,
    AuthModule,
    TasksModule,
    SubtasksModule
  ],
})
export class AppModule {}
