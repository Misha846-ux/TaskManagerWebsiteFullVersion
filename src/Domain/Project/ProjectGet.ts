export interface ProjectGet {
    Id: number,
    Title: string
    CreatedAt: Date,
    CompanyId: number,
    UsersId: number[],
    TasksId: number[]
}