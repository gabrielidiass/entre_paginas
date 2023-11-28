import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToMany,
    JoinTable,
    ChildEntity,
  } from "typeorm";
  import Pessoa from "../models/Pessoa";
  
  @ChildEntity()
  
  export default class Autor extends Pessoa {
  
    @Column("text")
    nacionalidade: string;
  
    //  LIVROS
  }
  