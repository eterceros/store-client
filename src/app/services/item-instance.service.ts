import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/operator/delay';
import {HttpClient} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map} from 'rxjs/operators';
import {ItemInstance} from '../shared/item-instance';
import {GenericService} from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ItemInstanceService extends GenericService<ItemInstance> {

  resource = 'iteminstances/';

  constructor(http: HttpClient) {
    super(http, 'iteminstances/');
  }

  getFeatured(): Observable<ItemInstance> {
    return this.http.get(baseURL + this.resource + '?featured=true').pipe(
      map(itemInstances =>
        (itemInstances as ItemInstance[]).find(itemInstance => itemInstance.featured === true))) as Observable<ItemInstance>;
  }

  getIds(): Observable<number[]> {
    return this.http.get(baseURL + 'iteminstances')
      .pipe(map(itemInstances => (itemInstances as ItemInstance[]).map(itemInstance => itemInstance.id))) as Observable<number[]>;
  }

}
