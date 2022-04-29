import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationDirective } from './pagination/pagination.directive';
import { PaginationControllerDirective } from './pagination/pagination-controller.directive';



@NgModule({
  declarations: [PaginationDirective, PaginationControllerDirective],
  imports: [
    CommonModule
  ],
  exports: [PaginationDirective, PaginationControllerDirective]
})
export class PaginationModule { }
