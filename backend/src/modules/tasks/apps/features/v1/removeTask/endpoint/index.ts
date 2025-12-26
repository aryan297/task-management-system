import { Controller, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RemoveTaskService } from '../services';
import { RemoveTaskResponseDto } from '../contract';

@ApiTags('Tasks')
@Controller('api/v1/tasks')
export class RemoveTaskEndpoint {
    constructor(private readonly service: RemoveTaskService) { }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove a task' })
    @ApiResponse({ status: 200, type: RemoveTaskResponseDto })
    @ApiResponse({ status: 404, description: 'Task not found' })
    async handle(@Param('id') id: string): Promise<RemoveTaskResponseDto> {
        return this.service.execute(id);
    }
}
