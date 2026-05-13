export interface UserGet {
    id: number,
    userName: string,
    email: string,
    globalRole: string,
    passToIcon: string,
    createdAt: Date,
    companiesId: number[],
    settings: string
}