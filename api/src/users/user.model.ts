import { Column, Model, Table, PrimaryKey, AutoIncrement, DefaultScope, Scopes } from 'sequelize-typescript';
import * as bcrypt from "bcrypt";

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

    async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }
}