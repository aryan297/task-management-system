import 'reflect-metadata';
import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';
import sinon from 'sinon';
import { CreateTaskService } from '../../../src/modules/tasks/apps/features/v1/createTask/services';
import { Task, TaskStatus } from '../../../src/modules/tasks/domain/task.entity';
import { Repository } from 'typeorm';

describe('CreateTaskService', () => {
    let service: CreateTaskService;
    let repository: sinon.SinonStubbedInstance<Repository<Task>>;

    before(() => {
        repository = sinon.createStubInstance(Repository) as sinon.SinonStubbedInstance<Repository<Task>>;
        service = new CreateTaskService(repository as unknown as Repository<Task>);
    });

    after(() => {
        sinon.restore();
    });

    it('should create a task successfully', async () => {
        const dto = {
            title: 'Test Task',
            description: 'Test Description',
        };

        const expectedTask = {
            id: 'uuid-123',
            title: 'Test Task',
            description: 'Test Description',
            status: TaskStatus.PENDING,
            created_at: new Date(),
            updated_at: new Date(),
        } as Task;

        repository.create.returns(expectedTask);
        repository.save.resolves(expectedTask);

        const result = await service.execute(dto);

        assert.equal(result.id, 'uuid-123');
        assert.equal(result.title, 'Test Task');
        assert.ok(repository.create.calledWith(dto));
        assert.ok(repository.save.calledWith(expectedTask));
    });
});
