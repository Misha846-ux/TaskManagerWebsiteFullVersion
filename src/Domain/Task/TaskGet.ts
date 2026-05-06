export interface TaskGet {
    Id: number,
    Status: string,
    TaskName: string,
    Description: string,
    Priority: string,
    CreatedAt: Date,
    DeadLine: Date,
    ProjectId: number,
    UserId: number
}