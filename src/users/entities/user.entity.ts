import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { MaxLength, MinLength } from "class-validator";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @MinLength(3)
  @MaxLength(10)
  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  birthdate: string;
}
