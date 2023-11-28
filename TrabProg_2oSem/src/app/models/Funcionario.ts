import {Entity, Column, PrimaryColumn, ManyToMany, JoinTable,ChildEntity} from 'typeorm';
import Pessoa from '../models/Pessoa';
@ChildEntity()

    export default class Funcionario extends Pessoa{

     @Column('varchar')
     ctps : string;

     @Column('varchar')
     senha : string;

     @Column('varchar')
     cpf : string;

     @Column('varchar')
     salario : string;

    }
