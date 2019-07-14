import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendIdService {
  private dataObservable: Observable<number>;
  private data: Subject<number>;

  constructor() {
    this.data = new Subject<number>();
    this.dataObservable = this.data.asObservable();
  }

  public sendId(id: number): void {
    this.data.next(id);
  }

  public onLoadId(): Observable<number> {
    return this.dataObservable;
  }

}
