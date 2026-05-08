export type TaskPostDto = {
    taskName: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    deadline: Date;
    projectId: number;
}