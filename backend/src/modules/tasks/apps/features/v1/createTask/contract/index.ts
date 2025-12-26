import { IsString, IsOptional, IsEnum, IsDateString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '../../../../../domain/task.entity';

export class CreateTaskRequestDto {
    @ApiProperty({ example: 'Buy groceries', description: 'Title of the task' })
    @IsString()
    @Length(1, 255)
    title: string;

    @ApiPropertyOptional({ example: 'Milk, Eggs, Bread', description: 'Description of the task' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ enum: TaskStatus, default: TaskStatus.PENDING })
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @ApiPropertyOptional({ enum: TaskPriority, example: TaskPriority.MEDIUM })
    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;

    @ApiPropertyOptional({ example: '2023-12-31T23:59:59Z' })
    @IsOptional()
    @IsDateString()
    due_date?: string;
}

export class CreateTaskResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ required: false })
    description: string;

    @ApiProperty({ enum: TaskStatus })
    status: TaskStatus;

    @ApiProperty({ enum: TaskPriority, required: false })
    priority: TaskPriority;

    @ApiProperty({ required: false })
    due_date: Date;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
}
