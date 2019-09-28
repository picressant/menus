import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from "@angular/forms";

@Component({
  selector: 'menus-form-field-wrapper',
  templateUrl: './form-field-wrapper.component.html',
  styleUrls: ['./form-field-wrapper.component.less']
})
export class FormFieldWrapperComponent implements OnInit {

  @Input()
  label: string;

  @Input()
  type: string;

  @Input()
  control: AbstractControl;

  @Input()
  suffix: string;

  @Input()
  dataError: string;

  constructor() {
  }

  ngOnInit() {
  }

  get isError() {
    return this.control.invalid && this.control.touched;
  }

}
