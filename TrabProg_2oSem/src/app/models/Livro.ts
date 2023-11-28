import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable} from 'typeorm';

import Autor from '../models/Autor';


@Entity('tb_livro')
class Livro {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

  
    @ManyToMany(() => Autor)
    @JoinTable({name : "tb_livro_autor", 
                joinColumn: {name: "livro_id", 
                                referencedColumnName: "id"}, 
                inverseJoinColumn: {name: "autor_id", 
                                    referencedColumnName: "id"}})
    autor: Autor[];
}
export default Livro;