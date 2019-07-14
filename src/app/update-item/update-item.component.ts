import {Component, OnDestroy, OnInit} from '@angular/core';
import {SendItemService} from '../services/send-item.service';
import {Subscription} from 'rxjs';
import {Item} from '../shared/item';
import {ActivatedRoute, Params} from '@angular/router';
import {ItemService} from '../services/item.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SendBooleanService} from '../services/send-boolean.service';
import {ItemInstance} from '../shared/item-instance';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit, OnDestroy {


  public item: Item;
  public itemId: number;
  public itemName: string;
  public itemInstanceState: string;
  public itemEdit: any;
  public itemIds: number[];
  public formEditItem: FormGroup;

  private sendItemSubscription: Subscription;
  const;
  itemInstanceStates = ['DISPONIBLE', 'VENDIDO', 'MANTENIMIENTO', 'EN_TRANSPORTE'];

  constructor(private sendItemService: SendItemService,
              private itemService: ItemService,
              private sendBooleanService: SendBooleanService,
              private fb: FormBuilder,
              private activeRouter: ActivatedRoute) {
    this.sendItemSubscription = new Subscription();
  }

  ngOnInit() {
    this.itemListener();
    this.initForm();
  }

  ngOnDestroy() {
    this.sendItemSubscription.unsubscribe();
  }

  public editItem(): void {
    if (this.formEditItem.valid) {
      this.itemService.updateItemInstance(this.item.id, this.formEditItem.value)
        .subscribe((item: ItemInstance) => {
          this.item = item.item;
        });
    }
  }

  public itemListener(): void {
    this.itemService.getItemIds().subscribe(items => {
      this.itemIds = items;
      this.activeRouter.params
        .switchMap((params: Params) => this.itemService.getItem(+params.id))
        .subscribe(item => {
          if (item) {
            this.item = item;
            this.itemId = item.id;
            this.itemName = item.name;
            this.itemInstanceState = item.itemInstanceState;
            this.formFilling(item);
          }
        });
    });
  }

  private initForm(): void {
    this.formEditItem = this.fb.group({
      price: [null],
      identifier: [null],
      itemInstanceState: [null],
      version: [null]
    });
  }

  private formFilling(item: Item): void {
    this.itemEdit = {
      price: item.price,
      identifier: item.identifier,
      itemInstanceState: item.itemInstanceState
    };

    this.formEditItem.patchValue(this.itemEdit);
  }
}
