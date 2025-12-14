import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('cart')
export class Cart {
  @PrimaryColumn({ name: 'id', generated: 'increment' })
  id: number;

  @Column({
    name: 'customer_id',
  })
  customerId: number;

  @Column({
    name: 'goods_id',
  })
  goodsId: number;

  @Column({
    name: 'amount',
  })
  amount: number;
}
