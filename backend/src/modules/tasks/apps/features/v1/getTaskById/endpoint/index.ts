import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetTaskByIdService } from '../services';
import { GetTaskByIdResponseDto } from '../contract';

@ApiTags('Tasks')
@Controller('api/v1/tasks')
export class GetTaskByIdEndpoint {
    constructor(private readonly service: GetTaskByIdService) { }

    @Get(':id')
    @ApiOperation({ summary: 'Get a task by ID' })
    @ApiResponse({ status: 200, type: GetTaskByIdResponseDto })
    @ApiResponse({ status: 404, description: 'Task not found' })
    async handle(@Param('id') id: string): Promise<GetTaskByIdResponseDto> {
        return this.service.execute(id);
    }
}
