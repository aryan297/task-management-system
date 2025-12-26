import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskService } from '../services';
import { CreateTaskRequestDto, CreateTaskResponseDto } from '../contract';

@ApiTags('Tasks')
@Controller('api/v1/tasks')
export class CreateTaskEndpoint {
    constructor(private readonly service: CreateTaskService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, type: CreateTaskResponseDto })
    async handle(@Body() body: CreateTaskRequestDto): Promise<CreateTaskResponseDto> {
        return this.service.execute(body);
    }
}
