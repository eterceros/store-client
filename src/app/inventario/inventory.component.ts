import {Component, Inject, OnInit} from '@angular/core';
import {SubCategory} from '../shared/sub-category';
import {SubCategoryService} from '../services/sub-category.service';
import {ItemInstanceService} from '../services/item-instance.service';
import {ItemInstance} from '../shared/item-instance';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  items: ItemInstance[];
  subCategories: SubCategory[];

  constructor(private itemInstanceService: ItemInstanceService, private subCategoryService: SubCategoryService,
              @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit(): void {
    this.subCategoryService.getAll().subscribe(subCategories => {
      this.subCategories = subCategories;
      console.log(subCategories);
    });
    this.itemInstanceService.getAll().subscribe(items => {
      this.items = items;
      console.log(items);
    });
  }
}
