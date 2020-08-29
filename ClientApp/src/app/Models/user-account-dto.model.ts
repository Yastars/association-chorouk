import { User } from '../Entities/User';
import { Account } from '../Entities/Account';

export class UserAccountDto {
    user: User;
    account: Account;
}