import { Column, Model, Table, PrimaryKey, AutoIncrement, DefaultScope, Scopes, HasOne } from 'sequelize-typescript';
import * as bcrypt from "bcrypt";
import { UserRefreshToken } from './user-refresh-token.model';

@DefaultScope({
    attributes: {
        exclude: ['password']
    }
})

@Scopes({
    withPassword: {
        attributes: {
            include: ['password']
        }
    }
})
@Table({
    tableName: "users",
})
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    userRoleId: number

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    email: string;

    @Column
    password: string;

    @HasOne(() => UserRefreshToken)
    refreshToken: UserRefreshToken

    async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }
}