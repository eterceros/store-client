import {Component, Inject, OnInit} from '@angular/core';
import {Item} from '../shared/item';
import {ItemService} from '../services/item.service';
import {SubCategory} from '../shared/sub-category';
import {SubCategoryService} from '../services/sub-category.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  items: Item[];
  subCategories: SubCategory[];

  constructor(private itemService: ItemService, private subCategoryService: SubCategoryService,
              @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit(): void {
    this.subCategoryService.getAll().subscribe(subCategories => {
      this.subCategories = subCategories;
      console.log(subCategories);
    });
    this.itemService.getItemsInstances().subscribe(items => {
      this.items = items;
      console.log(items);
    });
  }
}
