import { Column, Model, Table, PrimaryKey, ForeignKey, AutoIncrement, HasOne, BelongsTo, HasMany } from 'sequelize-typescript';
import { Appointment } from 'src/appointments/models/appointments.model';
import { Staff } from 'src/staff/models/staff.model';

@Table({
    tableName: "services",
})
export class Service extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @ForeignKey(() => Staff)
    @Column
    staffId: number

    @Column
    type: string

    @Column
    name: string

    @Column
    goal: string

    @Column
    imgSrc: string

    @Column
    description: string

    @Column
    shortDescription: string

    @Column
    duration: number

    @Column
    price: number

    @BelongsTo(() => Staff)
    staff: Staff

    @HasMany(() => Appointment)
    appointments: Appointment[]
}