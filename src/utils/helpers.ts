import {User, UserGoogle} from '../domain/interfaces/user/User';
import {jwtDecode} from 'jwt-decode';


export class Helpers {
    public static fullName(user: User) {
        const firstName = user.givenName?.split(' ') || [''];
        const lastName = user.lastName?.split(' ') || [''];
        return `${firstName[0]} ${lastName[0]}`;
    }

    public static decodeJwt = (token: string = ""): UserGoogle => {
        return jwtDecode(token);
    };
}
