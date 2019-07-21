import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/operator/delay';
import {HttpClient} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {GenericService} from './generic.service';
import {Image} from '../shared/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends GenericService<Image> {

  resource = 'images/';

  constructor(http: HttpClient) {
    super(http, 'images/');
  }

  getByItemInstanceId(itemInstanceId: number): Observable<Image[]> {
    return this.http.get(baseURL + this.resource + 'iteminstances/' + itemInstanceId) as Observable<Image[]>;
  }

  uploadImage(id: number, file: FormData): Observable<any> {
    return this.http.post(baseURL + this.resource + 'itemInstances/' + id, file) as Observable<any>;
  }

}
