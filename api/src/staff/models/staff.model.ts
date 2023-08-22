import { Column, Model, Table, PrimaryKey, ForeignKey, AutoIncrement, BelongsTo, HasMany } from 'sequelize-typescript';
import { Appointment } from 'src/appointments/models/appointments.model';
import { Service } from 'src/services/service.model';
import { User } from 'src/users/models/user.model';

@Table({
    tableName: "staff",
})
export class Staff extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User

    @HasMany(() => Service)
    services: Service[]

    @HasMany(() => Appointment)
    appointments: Appointment[]
}