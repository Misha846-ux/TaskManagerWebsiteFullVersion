export interface UserGet {
    Id: number,
    UserName: string,
    Email: string,
    GlobalRole: string,
    PassToIcon: string,
    CreatedAt: Date,
    CompaniesId: number[],
    Settings: string
}