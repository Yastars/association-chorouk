export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    jwtToken?: string;
    refresh: string;
    access: string;
}