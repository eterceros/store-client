import {ItemInstance} from './item-instance';

export class Expense {
  id: number;
  description: string;
  expenseType: string;
  value: number;
  itemInstance: ItemInstance;
}
