import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubCategory} from '../shared/sub-category';
import {GenericService} from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService extends GenericService<SubCategory> {

  resource = 'subcategories';

  constructor(http: HttpClient, resource: string) {
    super(http, 'subcategories');
  }
}
