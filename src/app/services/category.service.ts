import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../shared/category';
import {GenericService} from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends GenericService<Category> {

  resource = 'categories/';

  constructor(http: HttpClient) {
    super(http, 'categories/');
  }
}
