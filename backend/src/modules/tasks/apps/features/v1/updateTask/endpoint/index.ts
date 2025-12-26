import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateTaskService } from '../services';
import { UpdateTaskRequestDto, UpdateTaskResponseDto } from '../contract';

@ApiTags('Tasks')
@Controller('api/v1/tasks')
export class UpdateTaskEndpoint {
    constructor(private readonly service: UpdateTaskService) { }

    @Put(':id')
    @ApiOperation({ summary: 'Update an existing task' })
    @ApiResponse({ status: 200, type: UpdateTaskResponseDto })
    @ApiResponse({ status: 404, description: 'Task not found' })
    async handle(
        @Param('id') id: string,
        @Body() body: UpdateTaskRequestDto,
    ): Promise<UpdateTaskResponseDto> {
        return this.service.execute(id, body);
    }
}
