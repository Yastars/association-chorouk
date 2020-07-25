export class User {
    id: number;
    username: string;
    password: string;
    jwtToken?: string;
    refresh: string;
    access: string;
}