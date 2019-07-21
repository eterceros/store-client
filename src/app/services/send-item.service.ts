import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ItemInstance} from '../shared/item-instance';

@Injectable({
  providedIn: 'root'
})
export class SendItemService {
  private dataObservable: Observable<ItemInstance>;
  private data: Subject<ItemInstance>;

  constructor() {
    this.data = new Subject<ItemInstance>();
    this.dataObservable = this.data.asObservable();
  }

  public sendItemInstance(item: ItemInstance): void {
    this.data.next(item);
  }

  public onLoadItem(): Observable<ItemInstance> {
    return this.dataObservable;
  }

}
