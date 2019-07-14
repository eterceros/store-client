import {Component, OnInit} from '@angular/core';
import {ItemService} from '../services/item.service';
import {ActivatedRoute, Params} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Expense} from '../shared/expense';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.scss']
})
export class ExpenseItemComponent implements OnInit {

  public itemIds: number[];
  public item: Expense;
  public itemId: number;
  public nameItem: string;
  public formExpense: FormGroup;

  private itemExpenseEdit: any;

  constructor(private itemService: ItemService,
              private activeRouter: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
    this.itemListener();
  }

  public editExpense(): void {
    if (this.formExpense.valid) {
      this.itemService.updateExpense(this.item.id, this.formExpense.value)
        .subscribe((expense: Expense) => {
        });
    }
  }

  public itemListener(): void {
    this.itemService.getItemIds().subscribe(items => {
      this.itemIds = items;
      this.activeRouter.params
        .switchMap((params: Params) => this.itemService.getItemExpense(+params.id))
        .subscribe(expense => {
          if (expense) {
            this.item = expense;
            this.itemId = expense.id;
            this.nameItem = expense.itemInstance.item.name;
            this.formFilling(expense);
          }
        });
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
