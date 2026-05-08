const keys_AccessToken = "AccessToken"
const keys_CompanyId = "CompanyId"
const keys_IsAuthorize = "Authorize"

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

export function changeIsAuthorize(){
    if(localStorage.getItem(keys_IsAuthorize) == null){
        localStorage.setItem(keys_IsAuthorize, String(true))
    }
    else {
        let curent: Boolean = Boolean(localStorage.getItem(keys_IsAuthorize));
        localStorage.setItem(keys_IsAuthorize, String(!curent));
    }
}

export function getIsAuthorize(): Boolean{
    return Boolean(localStorage.getItem(keys_IsAuthorize));
}