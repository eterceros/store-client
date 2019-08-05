import {Injectable} from '@angular/core';
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

  getItemExpenses(id: number): Observable<Expense[]> {
    return this.http.get(baseURL + 'expenses/iteminstances/' + id) as Observable<Expense[]>;
  }

  getItemFeature(id: number): Observable<FeatureInstance> {
    return this.http.get(baseURL + 'featureinstances/' + id) as Observable<FeatureInstance>;
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
