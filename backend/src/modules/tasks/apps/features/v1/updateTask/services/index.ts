import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../../../../domain/task.entity';
import { UpdateTaskRequestDto, UpdateTaskResponseDto } from '../contract';

@Injectable()
export class UpdateTaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) { }

    async execute(id: string, dto: UpdateTaskRequestDto): Promise<UpdateTaskResponseDto> {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        Object.assign(task, dto);
        return this.taskRepository.save(task);
    }
}
