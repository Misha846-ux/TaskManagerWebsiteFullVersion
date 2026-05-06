export interface CompanyGet {
    Id: number,
    Name: string,
    Description: string,
    CreatedAt: Date,
    ProjectsId: number[],
    EmploeesId: number[]
}