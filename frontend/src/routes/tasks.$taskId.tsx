import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useTaskStore } from '@/store/useTaskStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'

export const Route = createFileRoute('/tasks/$taskId')({
    component: TaskDetail,
})

function TaskDetail() {
    const { taskId } = Route.useParams()
    const navigate = useNavigate()
    const { selectedTask, fetchTaskById, removeTask, loading } = useTaskStore()

    useEffect(() => {
        fetchTaskById(taskId)
    }, [taskId, fetchTaskById])

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this task?')) {
            await removeTask(taskId)
            navigate({ to: '/' })
        }
    }

    if (loading) return <div className="p-4">Loading...</div>
    if (!selectedTask) return <div className="p-4">Task not found</div>

    return (
        <div className="p-4 flex justify-center">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        {selectedTask.title}
                        <span className={`text-sm px-2 py-1 rounded ${selectedTask.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                            selectedTask.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                            {selectedTask.status}
                        </span>
                    </CardTitle>
                    <CardDescription>Created at: {new Date(selectedTask.created_at).toLocaleString()}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="whitespace-pre-wrap">{selectedTask.description || 'No description provided.'}</p>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>Priority: <span className="font-medium">{selectedTask.priority || 'N/A'}</span></div>
                        <div>Due Date: <span className="font-medium">{selectedTask.due_date ? new Date(selectedTask.due_date).toLocaleDateString() : 'N/A'}</span></div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Link to="/">
                        <Button variant="outline">Back to List</Button>
                    </Link>
                    <div className="flex gap-2">
                        <Link to="/tasks/$taskId/edit" params={{ taskId }}>
                            <Button>Edit Task</Button>
                        </Link>
                        <Button variant="destructive" onClick={handleDelete}>Delete Task</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
