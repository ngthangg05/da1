import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('goods')
export class Goods {
  @PrimaryColumn({ name: 'id', generated: 'increment' })
  id: number;

  @Column({
    name: 'type',
  })
  type: number;
  @Column({
    name: 'good_name',
    length: 255,
  })
  goodName: string;
  @Column({
    name: 'amount',
  })
  amount: number;
  @Column({
    name: 'price',
  })
  price: number;
  @Column({
    name: 'image',
  })
  image: string;
}
