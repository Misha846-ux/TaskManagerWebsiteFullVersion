const keys_AccessToken = "AccessToken"
const keys_CompanyId = "CompanyId"

export function setAccessToken(accessToken: string): void{
    localStorage.setItem(keys_AccessToken, accessToken)
}

export function getAccessToken(): string | null{
    return localStorage.getItem(keys_AccessToken)
}

export function setCompanyId(companyId: number): void{
    localStorage.setItem(keys_CompanyId, String(companyId))
}

export function getCompanyId(): number{
    return Number(localStorage.getItem(keys_CompanyId))
}