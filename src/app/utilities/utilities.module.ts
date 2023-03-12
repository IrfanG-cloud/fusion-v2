import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchDataByStringPipe } from './pipes/search-data-by-string';
import { CustomDateFormatPipe } from './pipes/custom-date-format';
import { ShortNumberPipe } from './pipes/short-number.pipe';


@NgModule({
  declarations: [
    SearchDataByStringPipe,
    CustomDateFormatPipe,
    ShortNumberPipe,
],
  imports: [
    CommonModule
  ],
  exports: [
    SearchDataByStringPipe,
    CustomDateFormatPipe,
    ShortNumberPipe,
  ]
})
export class UtilitiesModule { }
