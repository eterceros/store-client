import {Observable} from 'rxjs';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/operator/delay';
import {HttpClient} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map} from 'rxjs/operators';
import {ModelBase} from '../shared/model-base';

export class GenericService<T extends ModelBase> {


  constructor(protected http: HttpClient, protected resource: string) {
  }

  getAll(): Observable<T[]> {
    return this.http.get(baseURL + this.resource) as Observable<T[]>;
  }

  getById(id: number): Observable<T> {
    return this.http.get(baseURL + this.resource + id) as Observable<T>;
  }

  getIds(): Observable<number[]> {
    return this.http.get(baseURL + this.resource)
      .pipe(map(resource => (resource as T[]).map(resourceElement => resourceElement.id))) as Observable<number[]>;
  }

  update(id: number, resource: T): Observable<T> {
    return this.http.patch(baseURL + this.resource + id, resource) as Observable<T>;
  }

  save(resource: T): Observable<T> {
    return this.http.post(baseURL + this.resource, resource) as Observable<T>;
  }
}
