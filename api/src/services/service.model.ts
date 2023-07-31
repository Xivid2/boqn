import { Column, Model, Table, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: "services",
})
export class Service extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

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
}