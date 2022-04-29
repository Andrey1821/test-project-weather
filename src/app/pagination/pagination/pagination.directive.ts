import {
  Directive,
  EventEmitter,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { PaginationTransmitterService } from './pagination-transmitter.service';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Unsubscriber } from '../../decorators/unsubscriver';

@Directive({
  selector: '[appPagination]'
})
@Unsubscriber
export class PaginationDirective implements OnInit, OnChanges, OnDestroy {
  @Input() public locations: ILocation[];
  @Output() public onSetCount = new EventEmitter<number>();
  @Output() public onRefreshShowingList = new EventEmitter<ILocation[]>();
  private pageDataArray: Array<ILocation[]> = [];
  private elCount = 5;
  private currentIdx = 0;
  private componentDestroy: () => Observable<unknown>;

  constructor(
    @Host() private paginationTransmitterService: PaginationTransmitterService
  ) {
  }

  private get pagesDataLength(): number {
    const pagesCount = this.pageDataArray.length;
    const lastPageIdx = pagesCount ? pagesCount - 1 : 0;
    return (pagesCount - 1) * this.elCount + this.pageDataArray[lastPageIdx].length;
  }

  private get pagesCount(): number {
    return this.pageDataArray.length;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.pageDataArray.length) {
      this.selectChangePageDataMethod();
    }
  }

  ngOnInit(): void {
    this.initState();
    this.subscribeSwitchPageBySign();
    this.subscribeSwitchPageByNum();
  }

  private initState(): void {
    this.createPageData();
  }

  private subscribeSwitchPageBySign(): void {
    this.paginationTransmitterService.switchPageByArrow$
      .pipe(takeUntil(this.componentDestroy()))
      .subscribe(sign => {
        this.switchPageBySign(sign);
      })
  }

  private subscribeSwitchPageByNum(): void {
    this.paginationTransmitterService.switchPageByNumber$
      .pipe(takeUntil(this.componentDestroy()))
      .subscribe(pageNumber => {
        this.switchPageByNumber(pageNumber);
      })
  }

  private createPageData(): void {
    const iterationCount = Math.ceil(this.locations.length / this.elCount);
    let startIndex = 0;
    let endIndex = this.elCount;
    for (let i = 0; i <= iterationCount; i++) {
      this.pageDataArray[i] = this.locations.slice(startIndex, endIndex);
      startIndex += this.elCount;
      endIndex += this.elCount;
    }
    this.refreshShowingList(this.pageDataArray[this.currentIdx]);
  }

  private selectChangePageDataMethod(): void {
    if (this.locations.length > this.pagesDataLength) {
      this.addItem();
    }
  }

  private addItem(): void {
    const lastPageIdx = this.pagesCount ? this.pagesCount - 1 : 0;
    const newLocation = this.findNewLocation();
    if (this.pageDataArray[lastPageIdx].length < this.elCount) {
      this.pageDataArray[lastPageIdx].push(newLocation!);
    } else {
      this.pageDataArray[lastPageIdx + 1] = [newLocation!];
    }
    this.refreshShowingList(this.pageDataArray[this.currentIdx]);
  }

  private findNewLocation(): ILocation | undefined {
    let newLocation: ILocation | undefined;
    for (let location of this.locations) {
      const foundLocation = this.findItemOnPages(location);
      if (!foundLocation) {
        newLocation = location;
        break;
      }
    }
    return newLocation;
  }

  private findItemOnPages(location: ILocation): ILocation | undefined {
    let foundLocation: ILocation | undefined;
    for (let pageData of this.pageDataArray) {
      foundLocation = pageData.find(pageLocation => pageLocation.id === location.id);
      if(foundLocation) break;
    }
    return foundLocation;
  }

  private switchPageBySign(sign: '+' | '-'): void {
    if (sign === '+') {
      this.currentIdx++;
    } else {
      this.currentIdx--;
    }
    const currentList = this.pageDataArray[this.currentIdx];
    this.refreshShowingList(currentList);
  }

  private switchPageByNumber(pageNumber: number): void {
    this.currentIdx = pageNumber;
    const currentList = this.pageDataArray[this.currentIdx];
    this.refreshShowingList(currentList);
  }

  private refreshShowingList(list: ILocation[]): void {
    this.paginationTransmitterService.pagingDataObj$.next(this.createPagesDataObj());
    this.onRefreshShowingList.emit(list);
  }

  private createPagesDataObj(): ILocationPagingData {
    return {
      currentIdx: this.currentIdx,
      pagesData: this.pageDataArray
    }
  }

  ngOnDestroy(): void {
  }
}
