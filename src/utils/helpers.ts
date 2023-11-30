import {User} from "../interfaces/user/User";

export class Helpers {
    public static fullName(user: User) {
        if (user.complete) {
            return `${user.givenName} ${user.lastName} ${user.surname}`;
        }
        return user.username;
    }

    public static toSelect(list: Array<any>, value: string, label: string) {
        return list.map(item => ({value: item[value], label: item[label]}));
    }
}
