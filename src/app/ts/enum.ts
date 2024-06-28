export enum LocalStorage{
    AccessToken = 'access-token',
    RefreshToken = 'refresh-token'
}

export enum ApiRoutes {
    login = '/user/loginAdmin',
    logout = '/user/logout' , 
    user='/user/one-user',
    chauffeur='/chauffeur/',
    fournisseur='/fournisseur/',
    historique='/credit-history/',
    statistique='/statistics/'
 }