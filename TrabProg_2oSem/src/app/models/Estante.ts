import {Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';

import Livro from '../models/Livro';

@Entity('tb_estante')
export default class Estante {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    nome: string;

    //agregacao (losango não preenchido)
    @ManyToMany(() => Livro)
    @JoinTable({name : "tb_estante_livro", 
                joinColumn: {name: "estante_id", 
                                referencedColumnName: "id"}, 
                inverseJoinColumn: {name: "livro_id", 
                                    referencedColumnName: "id"}})
    livros: Livro[];

   

}
