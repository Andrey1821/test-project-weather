import { ChangeDetectorRef, Directive, ElementRef, Host, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { PaginationTransmitterService } from './pagination-transmitter.service';
import { filter, takeUntil } from 'rxjs/operators';
import { fromEvent, Observable } from 'rxjs';
import { Unsubscriber } from '../../decorators/unsubscriver';

@Directive({
  selector: '[appPaginationController]'
})
@Unsubscriber
export class PaginationControllerDirective implements OnInit, OnDestroy {
  private btnLeft: HTMLButtonElement;
  private btnRight: HTMLButtonElement;
  private pageNumbersContainer: HTMLDivElement | undefined;
  private selectedPage: number;
  private componentDestroy: () => Observable<unknown>;

  constructor(
    private renderer: Renderer2,
    private container: ElementRef,
    private cd: ChangeDetectorRef,
    @Host() private paginationTransmitterService: PaginationTransmitterService
  ) {
  }

  ngOnInit(): void {
    this.initButtons();
    this.subscribePagesDataObj();
    this.subscribeArrowsClick();
  }

  private subscribePagesDataObj(): void {
    this.paginationTransmitterService.pagingDataObj$
      .pipe(
        filter(v => !!v)
      )
      .subscribe(paginationData => {
        this.selectedPage = paginationData!.currentIdx + 1;
        this.createPageNumbers(paginationData!.pagesData.length);
        this.selectButtonsVisibility(paginationData!);
      });
  }

  private initButtons(): void {
    this.createBtnLeft();
    this.createBtnRight();
  }

  private createBtnLeft(): void {
    this.btnLeft = this.createBtn('location-list-controller__left-arrow');
  }

  private createBtnRight(): void {
    this.btnRight = this.createBtn('location-list-controller__right-arrow');
  }

  private createPageNumbers(pagesCount: number): void {
    if (this.pageNumbersContainer) this.removeElement(this.pageNumbersContainer);
    this.pageNumbersContainer = undefined;
    if (pagesCount <= 1) return;
    this.createPageNumbersContainer();
    for (let i = 1; i <= pagesCount; i++) {
      this.createPageNumber(i);
    }
  }

  private createBtn(elClass: string): HTMLButtonElement {
    const btn: HTMLButtonElement = this.createElement('button');
    btn.classList.add(
      'location-list-controller__arrows',
      'c-pointer',
      elClass
    );
    const img: HTMLImageElement = this.createElement('img');
    img.src = 'assets/icons/arrow_icon.svg';
    btn.appendChild(img);
    this.renderElement(btn);
    return btn;
  }

  private createPageNumbersContainer(): void {
    this.pageNumbersContainer = this.createElement('div');
    this.pageNumbersContainer!.classList.add('location-list-controller__numbers-container')
  }

  private createPageNumber(pageNumber: number) {
    const paragraphElement: HTMLSpanElement = this.createElement('span');
    paragraphElement.classList.add(
      'location-list-controller__number',
      'c-pointer'
    );
    if (this.selectedPage === pageNumber) paragraphElement.classList.add('location-list-controller__selected-number');
    paragraphElement.textContent = `${pageNumber}`;
    this.subscribePageNumberClick(paragraphElement);
    this.pageNumbersContainer!.appendChild(paragraphElement);
    this.renderElement(this.pageNumbersContainer);
  }

  private selectButtonsVisibility(paginationData: ILocationPagingData): void {
    const currentPage = paginationData.currentIdx + 1
    if (
      paginationData.pagesData.length === currentPage
    ) {
      this.hideBtn(this.btnRight);
    } else {
      this.showBtn(this.btnRight);
    }
    if (!paginationData.currentIdx) {
      this.hideBtn(this.btnLeft);
    } else {
      this.showBtn(this.btnLeft);
    }
  }

  private hideBtn(btn: HTMLButtonElement): void {
    btn.classList.add('display_none');
  }

  private showBtn(btn: HTMLButtonElement): void {
    btn.classList.remove('display_none');
  }

  private subscribeArrowsClick(): void {
    fromEvent(this.btnLeft, 'click')
      .pipe(takeUntil(this.componentDestroy()))
      .subscribe(() => {
        this.emitSwipePageSign('-')
      });

    fromEvent(this.btnRight, 'click')
      .pipe(takeUntil(this.componentDestroy()))
      .subscribe(() => {
        this.emitSwipePageSign('+')
      });
  }

  private subscribePageNumberClick(element: HTMLSpanElement): void {
    fromEvent(element, 'click')
      .pipe(takeUntil(this.componentDestroy()))
      .subscribe(event => {
        this.emitNewCurrentPageNumber(event);
      });
  }

  private createElement(elementName: string): any {
    return this.renderer.createElement(elementName);
  }

  private renderElement(element: any): void {
    this.renderer.appendChild(this.container.nativeElement, element);
  }

  private removeElement(element: any): void {
    this.renderer.removeChild(this.container.nativeElement, element);
  }

  private emitNewCurrentPageNumber(event: Event): void {
    const element = event.target as HTMLSpanElement;
    this.paginationTransmitterService.switchPageByNumber$.next(+element.innerText - 1);
  }

  private emitSwipePageSign(sign: '+' | '-') {
    this.paginationTransmitterService.switchPageByArrow$.next(sign);
  }

  ngOnDestroy(): void {
  }

}
