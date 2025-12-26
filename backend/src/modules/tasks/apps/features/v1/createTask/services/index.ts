import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../../../../domain/task.entity';
import { CreateTaskRequestDto, CreateTaskResponseDto } from '../contract';

@Injectable()
export class CreateTaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) { }

    async execute(dto: CreateTaskRequestDto): Promise<CreateTaskResponseDto> {
        const task = this.taskRepository.create(dto);
        const savedTask = await this.taskRepository.save(task);
        return savedTask;
    }
}
