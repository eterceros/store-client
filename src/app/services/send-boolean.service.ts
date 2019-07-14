import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendBooleanService {
  private dataObservable: Observable<boolean>;
  private data: Subject<boolean>;

  constructor() {
    this.data = new Subject<boolean>();
    this.dataObservable = this.data.asObservable();
  }

  public sendBoolean(id: boolean): void {
    this.data.next(id);
  }

  public onLoadBoolean(): Observable<boolean> {
    return this.dataObservable;
  }

}
