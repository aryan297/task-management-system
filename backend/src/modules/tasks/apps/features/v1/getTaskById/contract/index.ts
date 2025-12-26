import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '../../../../../domain/task.entity';

export class GetTaskByIdResponseDto {
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
