import {
  IsString,
  MaxLength,
  IsOptional,
  IsArray
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'Title (max 100)' })
  @IsString()
  @MaxLength(100)
  title:string;

  @ApiProperty({ description: 'Description (max 250)' })
  @IsString()
  @MaxLength(250)
  description:string;



  @ApiProperty({ description: 'Optional subtasks for this task', required: false, type: [String] })
  @IsOptional()
  @IsArray()
  subtasks?: { title: string; isDone?: boolean; position?: number }[];

}