import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetTasksService } from '../services';
import { GetTasksQueryDto, GetTasksResponseDto } from '../contract';

@ApiTags('Tasks')
@Controller('api/v1/tasks')
export class GetTasksEndpoint {
    constructor(private readonly service: GetTasksService) { }

    @Get()
    @ApiOperation({ summary: 'List all tasks with pagination and filters' })
    @ApiResponse({ status: 200, type: GetTasksResponseDto })
    async handle(@Query() query: GetTasksQueryDto): Promise<GetTasksResponseDto> {
        return this.service.execute(query);
    }
}
