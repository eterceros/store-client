import {Component, Input, OnInit} from '@angular/core';
import {ItemService} from '../services/item.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Expense} from '../shared/expense';
import {ItemInstanceService} from '../services/item-instance.service';
import {Item} from '../shared/item';
import {ItemInstance} from '../shared/item-instance';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.scss']
})
export class ExpenseItemComponent implements OnInit {

  @Input()
  public itemInstance: ItemInstance;
  displayedColumns: string[] = ['Tipo', 'Descripcion', 'Valor'];

  public expense: Expense;
  public expenses: Expense[];
  public item: Item;
  public itemId: number;
  public nameItem: string;
  public formExpense: FormGroup;

  private itemExpenseEdit: any;

  constructor(private itemInstanceService: ItemInstanceService,
              private itemService: ItemService,
              private activeRouter: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
    this.loadExpenses();
  }

  public editExpense(): void {
    if (this.formExpense.valid) {
      this.itemService.updateExpense(this.item.id, this.formExpense.value)
        .subscribe((expense: Expense) => {
        });
    }
  }

  public loadExpenses(): void {
    this.itemService.getItemExpenses(this.itemInstance.id).subscribe(expenses => {
      this.expenses = expenses;
    });
  }

  private initForm(): void {
    this.formExpense = this.fb.group({
      expenseType: [null],
      description: [null],
      value: [null]
    });
  }

  private formFilling(expense: Expense): void {
    this.itemExpenseEdit = {
      expenseType: expense.expenseType,
      description: expense.description,
      value: expense.value
    };

    this.formExpense.patchValue(this.itemExpenseEdit);
  }
}
