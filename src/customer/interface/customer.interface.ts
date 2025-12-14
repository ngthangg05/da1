import { Customers } from '../customer.entity';

export type CustomerId = Pick<Customers, 'id'>;

export interface CustomerInfo {
  username: string;
  password: string;
}
