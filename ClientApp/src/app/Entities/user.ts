export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    jwtToken?: string;
    refresh: string;
    access: string;

    constructor(refresh: string, access: string) {
        this.refresh = refresh;
        this.access = access;
    }
}