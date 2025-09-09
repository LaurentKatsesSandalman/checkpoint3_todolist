import {
  IsString,
  MaxLength,
  IsBoolean,
  IsInt,
  Min,
  IsNotEmpty
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubtaskDto {
  @ApiProperty({ description: 'Title (max 100)' })
  @IsString()
  @MaxLength(100)
  title:string;

  @ApiProperty({ description: 'IsDone' })
  @IsBoolean()
  isDone:boolean;

  @ApiProperty({ description: 'position' })
  @IsInt()
@Min(0)
    position: number;

  @ApiProperty({ description: 'ID of the parent task' })
  @IsNotEmpty()
  taskId: number;

}