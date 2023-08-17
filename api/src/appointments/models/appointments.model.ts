import { Column, Model, Table, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from "../../users/models/user.model";

@Table({
    tableName: "appointments",
})
export class Appointment extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @ForeignKey(() => User)
    @Column
    userId: string

    @Column
    date: Date

    @BelongsTo(() => User)
    user: User
}