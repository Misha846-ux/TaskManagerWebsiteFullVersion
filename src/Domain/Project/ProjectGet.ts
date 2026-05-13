export interface ProjectGet {
    id: number,
    title: string
    createdAt: Date,
    companyId: number,
    usersId: number[],
    tasksId: number[]
}