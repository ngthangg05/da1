import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Goods } from './goods.entity';
import { In, MoreThan, QueryRunner, Repository } from 'typeorm';
import { Role } from 'src/common/constant';

@Injectable()
export class GoodsRepository {
  constructor(
    @InjectRepository(Goods)
    private goodsRepository: Repository<Goods>,
  ) {}

  private getRunnerRepository(queryRunner?: QueryRunner): Repository<Goods> {
    return queryRunner
      ? queryRunner.manager.getRepository(Goods)
      : this.goodsRepository;
  }

  async getAllGoods(role: Role, queryRunner?: QueryRunner): Promise<Goods[]> {
    const condition = role === Role.ADMIN ? {} : { amount: MoreThan(0) };
    return await this.getRunnerRepository(queryRunner).find({
      select: ['id', 'type', 'amount', 'goodName', 'price', 'image'],
      where: condition,
    });
  }

  async getGoodsTypeId(
    role: Role,
    typeIds: number[],
    queryRunner?: QueryRunner,
  ): Promise<Goods[]> {
    const condition = role === Role.ADMIN ? {} : { amount: MoreThan(0) };
    return await this.getRunnerRepository(queryRunner).find({
      select: ['id', 'type', 'amount', 'goodName', 'price', 'image'],
      where: {
        type: In(typeIds),
        ...condition,
      },
    });
  }

  async getGoodsInfo(
    goodsId: number,
    queryRunner?: QueryRunner,
  ): Promise<Goods | null> {
    return await this.getRunnerRepository(queryRunner).findOne({
      select: ['id', 'type', 'amount', 'goodName', 'price', 'image'],
      where: {
        id: goodsId,
      },
    });
  }

  async updateGoodsById(
    goodId: number,
    goodsInfo: Partial<Goods>,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await this.getRunnerRepository(queryRunner).update(
      { id: goodId },
      goodsInfo,
    );
  }

  async createGoods(
    type: number,
    amount: number,
    goodName: string,
    price: number,
    image: string,
    queryRunner?: QueryRunner,
  ): Promise<number> {
    const repo = this.getRunnerRepository(queryRunner);
    const goodsInfo = await repo.create({
      type,
      amount,
      goodName,
      price,
      image,
    });
    const goods = await repo.save(goodsInfo);
    return goods.id;
  }

  async deleteGoods(goodsId: number, queryRunner?: QueryRunner): Promise<void> {
    await this.getRunnerRepository(queryRunner).delete({ id: goodsId });
  }
}
