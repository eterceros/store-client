import {Component, Inject, OnInit} from '@angular/core';
import {ItemInstance} from '../shared/item-instance';
import {ItemInstanceService} from '../services/item-instance.service';
import {ImageService} from '../services/image.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  itemInstances: ItemInstance[];

  constructor(private instanceService: ItemInstanceService,
              private imageService: ImageService,
              @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit(): void {
    this.instanceService.getAll().subscribe(itemInstances => {
        itemInstances.forEach(itemInstance => {
            this.imageService.getByItemInstanceId(itemInstance.id).subscribe(
              images => {
                itemInstance.images = images;
                if (images && images.length > 0) {
                  itemInstance.featuredImage = (itemInstance.images.filter(image => image.featured)[0]).image;
                }
              });
          }
        );
        this.itemInstances = itemInstances;
      }
    );
  }
}
