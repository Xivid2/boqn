import { Column, Model, Table, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import * as bcrypt from "bcrypt";
import { User } from './user.model';
import * as dayjs from 'dayjs';

@Table({
    tableName: "userRefreshTokens",
})
export class UserRefreshToken extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @ForeignKey(() => User)
    @Column
    userId: number

    @Column
    token: string

    @Column
    expiresAt: Date;

    @BelongsTo(() => User)
    user: User

    async compareToken(candidateToken: string): Promise<boolean> {
        return bcrypt.compare(candidateToken, this.token);
    }

    isTokenExpired() {
        return dayjs().isAfter(dayjs(this.expiresAt));
    }
}