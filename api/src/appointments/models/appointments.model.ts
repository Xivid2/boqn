import { Column, Model, Table, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from "../../users/models/user.model";
import { Service } from 'src/services/service.model';
import { Staff } from 'src/staff/models/staff.model';

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

    @ForeignKey(() => Staff)
    @Column
    staffId: number

    @ForeignKey(() => Service)
    @Column
    serviceId: number

    @Column
    date: Date

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => Service)
    service: Service

    @BelongsTo(() => Staff)
    staff: Staff
}