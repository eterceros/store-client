import {Component, OnInit} from '@angular/core';
import {SendItemService} from '../services/send-item.service';
import {ActivatedRoute, Params} from '@angular/router';
import {ItemService} from '../services/item.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SendBooleanService} from '../services/send-boolean.service';
import {ItemInstance} from '../shared/item-instance';
import {ItemInstanceService} from '../services/item-instance.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {
  public itemInstance: ItemInstance;
  public itemId: number;
  public itemName: string;
  public itemInstanceState: string;
  public itemEdit: any;
  public formEditItem: FormGroup;

  const;
  itemInstanceStates = ['DISPONIBLE', 'VENDIDO', 'MANTENIMIENTO', 'EN_TRANSPORTE'];

  constructor(private sendItemService: SendItemService,
              private itemInstanceService: ItemInstanceService,
              private itemService: ItemService,
              private sendBooleanService: SendBooleanService,
              private fb: FormBuilder,
              private activeRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.initForm();
    this.activeRouter.params
      .switchMap((params: Params) => this.itemInstanceService.getById(+params.id))
      .subscribe(itemInstance => {
        if (itemInstance) {
          this.itemInstance = itemInstance;
          this.itemId = itemInstance.id;
          this.itemName = itemInstance.item.name;
          this.itemInstanceState = itemInstance.itemInstanceState;
          this.formFilling(itemInstance);
        }
      });
  }

  public editItem(): void {
    if (this.formEditItem.valid) {
      this.itemInstanceService.update(this.itemInstance.id, this.formEditItem.value)
        .subscribe((itemInstance: ItemInstance) => {
          this.itemInstance = itemInstance;
        });
    }
  }

  private initForm(): void {
    this.formEditItem = this.fb.group({
      price: [null],
      identifier: [null],
      itemInstanceState: [null],
      version: [null]
    });
  }

  private formFilling(itemInstance: ItemInstance): void {
    this.itemEdit = {
      price: itemInstance.price,
      identifier: itemInstance.identifier,
      itemInstanceState: itemInstance.itemInstanceState
    };

    this.formEditItem.patchValue(this.itemEdit);
  }
}
