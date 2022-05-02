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

  private get simplePagesDataArray(): ILocation[] {
    let simpleArray: ILocation[] = [];
    for (let pageData of this.pageDataArray) {
      simpleArray.push(...pageData);
    }
    return simpleArray;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.pageDataArray.length) {
      this.selectChangePageDataMethod();
    }
  }

  ngOnInit(): void {
    this.initState();
    this.subscribeSwitchPageBySign();
    this.subscribeSwitchPageByNum();
  }

  ngOnDestroy(): void {
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
    const iterationCount = this.locations.length / this.elCount;
    let startIndex = 0;
    let endIndex = this.elCount;
    if (!this.pageDataArray[0]) {
      this.pageDataArray[0] = [];
    }
    for (let i = 0; i < iterationCount; i++) {
      this.pageDataArray[i] = this.locations.slice(startIndex, endIndex);
      startIndex += this.elCount;
      endIndex += this.elCount;
    }
    this.refreshShowingList(this.pageDataArray[this.currentIdx]);
  }

  private selectChangePageDataMethod(): void {
    if (this.locations.length > this.pagesDataLength) {
      this.addItem();
    } else {
      this.removeItem();
    }
  }

  private addItem(): void {
    const lastPageIdx = this.pagesCount ? this.pagesCount - 1 : 0;
    const newLocation = this.findLocationsChanges(this.locations, this.simplePagesDataArray);
    if (this.pageDataArray[lastPageIdx].length < this.elCount) {
      this.pageDataArray[lastPageIdx].push(newLocation!);
    } else {
      this.pageDataArray[lastPageIdx + 1] = [newLocation!];
    }
    this.refreshShowingList(this.pageDataArray[this.currentIdx]);
  }

  private removeItem(): void {
    const deletedLocation = this.findLocationsChanges(this.simplePagesDataArray, this.locations);
    const deleteIndex = this.simplePagesDataArray.findIndex(locationData => locationData.id === deletedLocation?.id);
    const pageItemIdx = deleteIndex % this.elCount;
    const pageIndex = (deleteIndex - pageItemIdx) / this.elCount;
    this.pageDataArray[pageIndex].splice(pageItemIdx, 1);
    if (!this.pageDataArray[pageIndex][0]) {
      if (this.currentIdx) {
        this.currentIdx--;
        this.pageDataArray.splice(pageIndex, 1);
      }
      this.refreshShowingList(this.pageDataArray[this.currentIdx]);
      return;
    }
    if (!this.pageDataArray[pageIndex + 1]) {
      this.refreshShowingList(this.pageDataArray[this.currentIdx]);
      return;
    }
    this.pageDataArray[pageIndex].push(this.pageDataArray[pageIndex + 1][0]);
    this.pageDataArray[pageIndex + 1].splice(0, 1);
    if (!this.pageDataArray[pageIndex + 1][0]) {
      this.pageDataArray.splice(pageIndex + 1, 1);
      this.refreshShowingList(this.pageDataArray[this.currentIdx]);
      return;
    }
    this.refreshShowingList(this.pageDataArray[this.currentIdx]);
  }

  private findLocationsChanges(newState: ILocation[], oldState: ILocation[]): ILocation | undefined {
    let newLocation: ILocation | undefined;
    for (let location of newState) {
      const foundLocation = this.findItem(location, oldState);
      if (!foundLocation) {
        newLocation = location;
        break;
      }
    }
    return newLocation;
  }

  private findItem(location: ILocation, locations: ILocation[]): ILocation | undefined {
    return locations.find(locationData => locationData.id === location.id);
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
}
