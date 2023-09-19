import {User} from "../interfaces/user/User";
import { v4 as uuidv4 } from 'uuid';

export class Helpers {
    public static fullName(user: User) {
        if (user.complete) {
            return `${user.givenName} ${user.lastName} ${user.surname}`;
        }
        return user.username;
    }

    public static generateUUID() {
        return uuidv4();
    }
}
