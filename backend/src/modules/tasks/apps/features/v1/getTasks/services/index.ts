import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Task } from '../../../../../domain/task.entity';
import { GetTasksQueryDto, GetTasksResponseDto } from '../contract';

@Injectable()
export class GetTasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) { }

    async execute(query: GetTasksQueryDto): Promise<GetTasksResponseDto> {
        const { status, priority, search, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;

        const queryBuilder = this.taskRepository.createQueryBuilder('task');

        if (status) {
            queryBuilder.andWhere('task.status = :status', { status });
        }

        if (priority) {
            queryBuilder.andWhere('task.priority = :priority', { priority });
        }

        if (search) {
            queryBuilder.andWhere(
                '(task.title LIKE :search OR task.description LIKE :search)',
                { search: `%${search}%` },
            );
        }

        queryBuilder.orderBy('task.created_at', 'DESC');
        queryBuilder.skip(skip).take(limit);

        const [data, total] = await queryBuilder.getManyAndCount();

        return {
            data,
            total,
            page,
            limit,
        };
    }
}
