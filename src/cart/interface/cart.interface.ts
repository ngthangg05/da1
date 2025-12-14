export interface CartInfo {
  customerId: number;
  goodsId: number;
  amount: number;
}

export interface CartGoodsInfo {
  cartId: number;
  customerId: number;
  goodsId: number;
  name: string;
  type: number;
  goodName: string;
  cartAmount: number;
  price: number;
  image: string;
}