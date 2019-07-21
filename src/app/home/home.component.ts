import {Component, OnInit} from '@angular/core';
import {Employee} from '../shared/employee';
import {EmployeeService} from '../services/employee.service';
import {ItemInstance} from '../shared/item-instance';
import {ItemInstanceService} from '../services/item-instance.service';
import {ImageService} from '../services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  itemInstance: ItemInstance;
  employee: Employee;

  constructor(private itemInstanceService: ItemInstanceService,
              private imageService: ImageService,
              private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.itemInstanceService.getFeatured()
      .subscribe(itemInstance => {
        this.itemInstance = itemInstance;
        this.imageService.getByItemInstanceId(itemInstance.id).subscribe(images => {
          this.itemInstance.images = images;
          if (images && images.length > 0) {
            this.itemInstance.featuredImage = images.filter(image => image.featured)[0].image;
          }
        });
      });
    this.employeeService.getFeaturedEmployee()
      .subscribe(employee => this.employee = employee);
  }

}
