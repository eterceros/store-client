import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseURL} from '../shared/baseurl';
import {SubCategory} from '../shared/sub-category';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<SubCategory[]> {
    return this.http.get(baseURL + 'subcategories') as Observable<SubCategory[]>;
  }
}
