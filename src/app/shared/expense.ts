import {ItemInstance} from './item-instance';
import {ExpenseType} from './expense-type';

export class Expense {
  id: number;
  description: string;
  expenseType: ExpenseType;
  value: number;
  itemInstance: ItemInstance;
}
