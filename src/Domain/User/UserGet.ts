export interface UserGet {
    Id: number,
    UserName: string,
    Email: string,
    GlobalRole: string,
    PassToIcon: string,
    CreatedAt: string,
    CompaniesId: number[],
    Settings: string
}