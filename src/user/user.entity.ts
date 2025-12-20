import { Role } from 'src/common/constant';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
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

  @Column({
    name: 'role',
  })
  role: Role;
}
