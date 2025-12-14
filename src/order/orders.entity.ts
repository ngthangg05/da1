import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('orders')
export class Orders {
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

  @Column({
    type: 'double',
    name: 'price',
  })
  price: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
