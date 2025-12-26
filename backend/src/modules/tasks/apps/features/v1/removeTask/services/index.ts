import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../../../../domain/task.entity';
import { RemoveTaskResponseDto } from '../contract';

@Injectable()
export class RemoveTaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) { }

    async execute(id: string): Promise<RemoveTaskResponseDto> {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return { message: 'Task deleted successfully' };
    }
}
