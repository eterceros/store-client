import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Item} from '../shared/item';

@Injectable({
  providedIn: 'root'
})
export class SendItemService {
  private dataObservable: Observable<Item>;
  private data: Subject<Item>;

  constructor() {
    this.data = new Subject<Item>();
    this.dataObservable = this.data.asObservable();
  }

  public sendItem(item: Item): void {
    this.data.next(item);
  }

  public onLoadItem(): Observable<Item> {
    return this.dataObservable;
  }

}
