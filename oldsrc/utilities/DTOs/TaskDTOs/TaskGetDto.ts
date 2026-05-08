export type TaskGetDto = {
    id: number;
    status: string;
    taskName: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    createdAt: Date;
    deadline: Date;
    projectId: number;
    userId: number;
}