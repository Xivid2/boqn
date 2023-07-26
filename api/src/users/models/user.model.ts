import { Column, Model, Table, PrimaryKey, ForeignKey, AutoIncrement, DefaultScope, Scopes, HasOne, BelongsTo } from 'sequelize-typescript';
import * as bcrypt from "bcrypt";
import { UserRefreshToken } from './user-refresh-token.model';
import { g_UserRole } from './user-roles.model';

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

    @ForeignKey(() => g_UserRole)
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

    @BelongsTo(() => g_UserRole)
    role: g_UserRole

    async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }
}