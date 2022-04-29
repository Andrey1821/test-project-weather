import { Subject } from 'rxjs';

export function Unsubscriber(constructor: Function): void {
  const originalDestroy = constructor.prototype.ngOnDestroy;

  if (typeof originalDestroy !== 'function') {
    console.warn(`${constructor.name} is using @Unsubscriber but doesn't implement OnDestroy`);
  }

  constructor.prototype.componentDestroy = function (): object {
    this._takeUntilDestroy$ = this._takeUntilDestroy$ || new Subject();

    return this._takeUntilDestroy$.asObservable();
  };

  // @ts-ignore
  constructor.prototype.ngOnDestroy = function (...args): void {
    if (typeof originalDestroy === 'function') {
      originalDestroy.apply(this, args);
    }

    if (this._takeUntilDestroy$) {
      this._takeUntilDestroy$.next();
      this._takeUntilDestroy$.complete();
    }
  };
}
