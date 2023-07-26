import { Column, Model, Table, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from "../../users/models/user.model";

@Table({
    tableName: "ergoAppointments",
})
export class ErgoAppointment extends Model {
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