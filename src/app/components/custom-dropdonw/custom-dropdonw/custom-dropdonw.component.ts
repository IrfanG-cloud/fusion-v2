import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-custom-dropdonw',
  templateUrl: './custom-dropdonw.component.html',
  styleUrls: ['./custom-dropdonw.component.scss'],

})
export class CustomDropdonwComponent implements OnInit {
  @Input() options: any = '';
  @Input() title: string = '';
  @Output() currentValueChange = new EventEmitter();

  public currentValue: any = '';
  public dropdownOpen: boolean = false;
  public get dropdownElement(): Element {
    return this.elem.nativeElement.querySelector('.dropdown-list');
  }

  private currentIndex = -1;

  constructor(private elem: ElementRef) {}

  ngOnInit(): void {
    this.currentValue = this.options[0];
  }

  closeDropdown() {
    this.dropdownElement.setAttribute('aria-expanded', 'false');
    this.currentIndex = -1;
    this.dropdownOpen = false;
  }

  selectByIndex(i: number) {
    let value = this.options[i];
    this.select(value);
  }

  select(value: any) {
    this.currentValue = value;
    this.closeDropdown();
    this.currentValueChange.emit(this.currentValue);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.dropdownElement.setAttribute(
      'aria-expanded',
      this.dropdownOpen ? 'true' : 'false'
    );
  }
}
