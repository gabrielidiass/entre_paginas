import {Entity, Column, PrimaryGeneratedColumn, TableInheritance} from
'typeorm';
@Entity('tb_pessoa')
@TableInheritance({ column: { type: "varchar", name: "type" } })
export default abstract class Pessoa {

 @PrimaryGeneratedColumn()
 id: number;

 @Column('text')
 nome: string;
} 