import { Column, Model, Table, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: "g_userRoles",
})
export class g_UserRole extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    name: string
}