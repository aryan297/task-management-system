import { ApiProperty } from '@nestjs/swagger';

export class RemoveTaskResponseDto {
    @ApiProperty({ example: 'Task deleted successfully' })
    message: string;
}
