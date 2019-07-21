import {Component, OnInit} from '@angular/core';
import {ItemService} from '../services/item.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {SendBooleanService} from '../services/send-boolean.service';
import {SendItemService} from '../services/send-item.service';
import {ImageService} from '../services/image.service';
import {ItemInstanceService} from '../services/item-instance.service';
import {ItemInstance} from '../shared/item-instance';
import {Image} from '../shared/image';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  itemInstance: ItemInstance;
  image: Image;
  itemIds: number[];
  prev: number;
  next: number;
  public imagePath: string;
  public profit: number;

  private imageFile: File;

  constructor(private itemService: ItemService,
              private itemInstanceService: ItemInstanceService,
              private imageService: ImageService,
              private route: ActivatedRoute,
              private sendItemService: SendItemService,
              private router: Router,
              private sendBooleanService: SendBooleanService,
              private location: Location) {
    this.imagePath = '';
  }

  ngOnInit() {
    this.itemInstanceService.getIds().subscribe(items => {
      this.itemIds = items;
      this.route.params
        .switchMap((params: Params) => this.itemInstanceService.getById(+params.id))
        .subscribe(itemInstance => {
          if (itemInstance) {
            this.itemInstance = itemInstance;
            this.imageService.getByItemInstanceId(itemInstance.id).subscribe(images => {
              this.itemInstance.images = images;
              if (images && images.length > 0) {
                this.itemInstance.featuredImage = images.filter(image => image.featured)[0].image;
              }
            });
            this.setPrevNext(itemInstance.id);
            this.sendItemService.sendItemInstance(itemInstance);
          }
        });
    });

  }

  public uploadImage(event: any): void {
    const file: File = event.target.files[0];

    if (event.target.files && file) {
      const reader = new FileReader();
      this.imageFile = file;

      reader.onload = (progressEvent: ProgressEvent) => {
        this.imagePath = (progressEvent.target as FileReader).result.toString();
        this.image = new Image();
        this.image.name = this.imageFile.name;
        this.image.itemInstance = this.itemInstance;
        this.image.image = this.imagePath.substr(23, this.imagePath.length + 1);
        this.imageService.save(this.image)
          .subscribe((value: any) => {
          });
        this.ngOnInit();
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public deleteImage(): void {
    this.itemService.deleteImage(this.itemInstance.id)
      .subscribe((image) => {
      });
    this.itemInstance.images = null;
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
