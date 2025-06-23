import { Model } from "sequelize-typescript";
import { UserRole } from "src/global/types/user.roles";
export declare class Users extends Model {
    user_id: number;
    username: string;
    email: string;
    password: string;
    role: UserRole;
}
