import { Column, Model, Table, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: "massages",
})
export class Massage extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    name: string

    @Column
    goal: string

    @Column
    description: string

    @Column
    duration: number

    @Column
    price: number
}