const keys_AccessToken = "AccessToken"

export function setAccessToken(accessToken: string){
    localStorage.setItem(keys_AccessToken, accessToken)
}

export function getAccessToken(): string | null{
    return localStorage.getItem(keys_AccessToken)
}