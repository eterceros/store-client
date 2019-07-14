import {Injectable} from '@angular/core';
import {Item} from '../shared/item';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/operator/delay';
import {HttpClient} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map} from 'rxjs/operators';
import {ItemInstance} from '../shared/item-instance';

@Injectable({
  providedIn: 'root'
})
export class ItemInstanceService {

  constructor(private http: HttpClient) {
  }

  private resource = 'iteminstances/';

  getItemsInstances(): Observable<Item[]> {
    return this.http.get(baseURL + this.resource) as Observable<Item[]>;
  }

  getItem(id: number): Observable<Item> {
    return this.http.get(baseURL + this.resource + id) as Observable<Item>;
  }

  getFeaturedItem(): Observable<Item> {
    return this.http.get(baseURL + this.resource + '?featured=true').pipe(
      map(items => (items as Item[]).find(item => item.featured === true))) as Observable<Item>;
  }

  getItemIds(): Observable<number[]> {
    return this.http.get(baseURL + this.resource).pipe(map(items => (items as Item[]).map(item => item.id))) as Observable<number[]>;
  }

  updateItemInstance(id: number, itemEdit: ItemInstance): Observable<ItemInstance> {
    console.log(itemEdit);
    return this.http.patch(baseURL + this.resource + id, itemEdit) as Observable<ItemInstance>;
  }

}
