import { Column, Model, Table, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { User } from "../../users/models/user.model";

@Table({
    tableName: "ergoAppointments",
})
export class ergoAppointment extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @ForeignKey(() => User)
    @Column
    name: string

    @Column
    date: Date
}