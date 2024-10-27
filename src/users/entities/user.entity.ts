import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { MaxLength, MinLength } from 'class-validator';

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

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  haveBalance(amount: number): boolean {
    return this.balance >= amount;
  }
}
