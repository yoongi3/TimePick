export function checkAlphaNum(password: string):boolean{
    if ( 
        !/[a-zA-Z]/.test(password) || 
        !/\d/.test(password)
      ){
        return true;
      }
    return false;
}