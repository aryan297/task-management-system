import { create } from 'zustand'

export interface Task {
    id: string
    title: string
    description?: string
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
    priority?: 'LOW' | 'MEDIUM' | 'HIGH'
    due_date?: string
    created_at: string
    updated_at: string
}

interface TaskState {
    tasks: Task[]
    selectedTask: Task | null
    loading: boolean
    error: string | null
    fetchTasks: () => Promise<void>
    fetchTaskById: (id: string) => Promise<void>
    createTask: (data: Partial<Task>) => Promise<void>
    updateTask: (id: string, data: Partial<Task>) => Promise<void>
    removeTask: (id: string) => Promise<void>
}

const API_URL = 'http://localhost:3000/api/v1/tasks'

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    selectedTask: null,
    loading: false,
    error: null,

    fetchTasks: async () => {
        set({ loading: true, error: null })
        try {
            const response = await fetch(API_URL)
            if (!response.ok) throw new Error('Failed to fetch tasks')
            const data = await response.json()
            set({ tasks: data.data || [], loading: false })
        } catch (error: any) {
            set({ error: error.message, loading: false })
        }
    },

    fetchTaskById: async (id) => {
        set({ loading: true, error: null })
        try {
            const response = await fetch(`${API_URL}/${id}`)
            if (!response.ok) throw new Error('Failed to fetch task')
            const data = await response.json()
            set({ selectedTask: data, loading: false })
        } catch (error: any) {
            set({ error: error.message, loading: false })
        }
    },

    createTask: async (data) => {
        set({ loading: true, error: null })
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to create task')
            const newTask = await response.json()
            set((state) => ({ tasks: [newTask, ...state.tasks], loading: false }))
        } catch (error: any) {
            set({ error: error.message, loading: false })
            throw error
        }
    },

    updateTask: async (id, data) => {
        set({ loading: true, error: null })
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to update task')
            const updatedTask = await response.json()
            set((state) => ({
                tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
                selectedTask: updatedTask,
                loading: false,
            }))
        } catch (error: any) {
            set({ error: error.message, loading: false })
            throw error
        }
    },

    removeTask: async (id) => {
        set({ loading: true, error: null })
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) throw new Error('Failed to remove task')
            set((state) => ({
                tasks: state.tasks.filter((t) => t.id !== id),
                loading: false,
            }))
        } catch (error: any) {
            set({ error: error.message, loading: false })
            throw error
        }
    },
}))
