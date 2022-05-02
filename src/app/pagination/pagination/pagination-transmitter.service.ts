import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class PaginationTransmitterService {
  public pagingDataObj$ = new BehaviorSubject<ILocationPagingData | undefined>(undefined);
  public switchPageByArrow$ = new Subject<'+' | '-'>();
  public switchPageByNumber$ = new Subject<number>();
}
