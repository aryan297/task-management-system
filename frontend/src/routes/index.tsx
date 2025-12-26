import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useTaskStore } from '../store/useTaskStore'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const { tasks, loading, fetchTasks } = useTaskStore()

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Tasks</h1>
                <Link to="/tasks/create">
                    <Button>Create Task</Button>
                </Link>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid gap-4">
                    {tasks.map((task) => (
                        <div key={task.id} className="border p-4 rounded shadow">
                            <h2 className="text-xl font-semibold">{task.title}</h2>
                            <p>{task.description}</p>
                            <div className="mt-2 text-sm text-gray-500">
                                Status: {task.status} | Priority: {task.priority}
                            </div>
                            <div className="mt-2 flex gap-2">
                                <Link to="/tasks/$taskId" params={{ taskId: task.id }}>
                                    <Button variant="outline" size="sm">View</Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
