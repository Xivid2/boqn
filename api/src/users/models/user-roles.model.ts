import { Column, Model, Table, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: "userRoles",
})
export class UserRole extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    name: string
}