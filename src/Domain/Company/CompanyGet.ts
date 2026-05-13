export interface CompanyGet {
    id: number,
    name: string,
    description: string,
    createdAt: Date,
    projectsId: number[],
    emploeesId: number[]
}