import {User} from '../domain/interfaces/user/User';


export class Helpers {
    public static fullName(user: User) {
        if (user.complete) {
            return `${user.givenName} ${user.lastName} ${user.surname}`;
        }
        return user.username;
    }
}
