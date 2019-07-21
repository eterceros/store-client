import {Injectable} from '@angular/core';
import {Item} from '../shared/item';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/operator/delay';
import {HttpClient} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {Expense} from '../shared/expense';
import {FeatureInstance} from '../shared/feature-instance';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

  getItems(): Observable<Item[]> {
    // return Observable.of(ITEMS).delay(2000);
    return this.http.get(baseURL + 'iteminstances') as Observable<Item[]>;
  }

  getItem(id: number): Observable<Item> {
    return this.http.get(baseURL + 'iteminstances/' + id) as Observable<Item>;
  }

  getItemExpense(id: number): Observable<Expense> {
    return this.http.get(baseURL + 'expense/' + id) as Observable<Expense>;
  }

  getItemFeature(id: number): Observable<FeatureInstance> {
    return this.http.get(baseURL + 'featureinstances' + id) as Observable<FeatureInstance>;
  }

  uploadImage(id: number, file: FormData): Observable<any> {
    return this.http.post(baseURL + 'itemInstances/' + id + '/image', file) as Observable<any>;
  }

  deleteImage(id: number): Observable<any> {
    return this.http.delete(baseURL + 'itemInstances/' + id + '/image') as Observable<any>;
  }

  updateExpense(id: number, expenseEdit: any): Observable<Expense> {
    return this.http.put(baseURL + 'expense/' + id, expenseEdit) as Observable<Expense>;
  }

  updateFeature(id: number, featureEdit: any): Observable<FeatureInstance> {
    return this.http.put(baseURL + 'feature/' + id, featureEdit) as Observable<FeatureInstance>;
  }

}
