import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../shared/item';
import {ItemService} from '../services/item.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {SendBooleanService} from '../services/send-boolean.service';
import {SendItemService} from '../services/send-item.service';
import {Expense} from '../shared/expense';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit, OnDestroy {

  item: Item;
  itemIds: number[];
  prev: number;
  next: number;
  public imagePath: string;
  public profit: number;
  public showImage: boolean;

  private image: File;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private sendItemService: SendItemService,
              private router: Router,
              private sendBooleanService: SendBooleanService,
              private location: Location) {
    this.imagePath = '';
    this.showImage = false;
  }

  ngOnInit() {
    this.itemService.getItemIds().subscribe(items => {
      this.itemIds = items;
      this.route.params
        .switchMap((params: Params) => this.itemService.getItem(+params.id))
        .subscribe(item => {
          if (item) {
            this.item = item;
            this.setPrevNext(item.id);
            this.sendBooleanService.sendBoolean(true);
            this.sendItemService.sendItem(item);

            this.loadExpenseItem(item.id);

            this.showImage = !!item.image;
          }
        });
    });

  }

  ngOnDestroy() {
    this.sendBooleanService.sendBoolean(false);
  }

  private loadExpenseItem(id: number): void {
    this.itemService.getItemExpense(id)
      .subscribe((expense: Expense) => {
        if (expense) {
          this.profit = expense.itemInstance.profit;
        }
      });
  }

  public uploadImage(event: any): void {
    const file: File = event.target.files[0];

    if (event.target.files && file) {
      const reader = new FileReader();
      this.image = file;

      reader.onload = (progressEvent: ProgressEvent) => {
        this.imagePath = (progressEvent.target as FileReader).result.toString();
        this.item.image = this.imagePath.substr(23, this.imagePath.length + 1);
      };
      reader.readAsDataURL(event.target.files[0]);

      const uploadData: FormData = new FormData();
      uploadData.append('file', this.image);

      this.itemService.uploadImage(this.item.id, uploadData)
        .subscribe((value: any) => {
        });

      this.showImage = true;
    }
  }

  public deleteImage(): void {
    this.itemService.deleteImage(this.item.id)
      .subscribe((image) => {
      });
    this.item.image = null;
    this.showImage = false;
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(itemId: number) {
    const index = this.itemIds.indexOf(itemId);
    this.prev = this.itemIds[(this.itemIds.length + index - 1) % this.itemIds.length];
    this.next = this.itemIds[(this.itemIds.length + index + 1) % this.itemIds.length];
  }
}
