import {jwtDecode} from 'jwt-decode'

export const isTokenExpired = (token : string) => {
    try {
        const {exp} = jwtDecode(token);
        if(!exp){
            return true;
        }
        return Date.now() >= exp * 1000
    }catch (error){
        console.error(error)
        return true;
    }
}

export interface UserData {
    username : string | null;
    role : string | null;
}
export const getUserFromToken = (token : string) => {
    return jwtDecode<UserData>(token)
}