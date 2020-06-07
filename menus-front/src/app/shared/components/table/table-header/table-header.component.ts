import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'menus-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.less']
})
export class TableHeaderComponent {
  searchForm: FormGroup;

  @Output()
  onSearch = new EventEmitter<string>();

  @Output()
  onAdd = new EventEmitter<void>();

  @Input()
  noSearch: boolean = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: ['']
    });

    this.searchForm.controls.search.valueChanges.pipe(
      debounceTime(200)
    ).subscribe(val => this.onSearch.emit(val)
    )
  }

  onAddClick() {
    this.onAdd.emit();
  }
}
