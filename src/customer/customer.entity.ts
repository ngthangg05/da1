import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('customers')
export class Customers {
  @PrimaryColumn({ name: 'id', generated: 'increment' })
  id: number;

  @Column({
    name: 'username',
    length: 255,
  })
  username: string;

  @Column({
    name: 'password_hash',
    length: 255,
  })
  passwordHash: string;
}
