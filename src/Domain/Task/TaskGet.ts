export interface TaskGet {
    id: number,
    status: string,
    taskName: string,
    description: string,
    priority: string,
    createdAt: Date,
    deadLine: Date,
    projectId: number,
    userId: number
}