import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('favorite_goods')
export class Fav {
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
}
