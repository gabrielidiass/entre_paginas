import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import Livro from '../models/Livro';
@Entity('tb_editora')
class Editora {//codigo fonte referente ao pdf da parte 7.

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    nome: string;

    @Column('varchar')
    cnpj: string;
    
 @ManyToMany(() => Livro)
 @JoinTable({name : "tb_editora_livro", 
             joinColumn: {name: "editora_id", 
                             referencedColumnName: "id"}, 
             inverseJoinColumn: {name: "livro_id", 
                                 referencedColumnName: "id"}})
 livros: Livro[];
}
export default Editora;