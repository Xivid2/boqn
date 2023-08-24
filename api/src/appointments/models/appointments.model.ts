import { Column, Model, Table, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
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

    @ForeignKey(() => Staff)
    @Column
    staffId: number

    @ForeignKey(() => Service)
    @Column
    serviceId: number

    @Column
    date: Date

    @Column
    firstName: string

    @Column
    lastName: string

    @Column
    email: string

    @Column
    phone: string

    @BelongsTo(() => Service)
    service: Service

    @BelongsTo(() => Staff)
    staff: Staff
}