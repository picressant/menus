import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Unit } from 'src/app/shared/models/unit.model';

@Component({
  selector: 'menus-add-unit-dialog',
  templateUrl: './add-unit-dialog.component.html',
  styleUrls: ['./add-unit-dialog.component.less']
})
export class AddUnitDialogComponent implements OnInit {

  form: FormGroup;
  isModification: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddUnitDialogComponent>,
    private build: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Unit
  ) { 
    this.form = this.build.group({
      id: [null],
      name: ['', Validators.required],
      symbol: ['', Validators.required]
    });

    if (data !== null)
      this.form.reset(data);
    this.isModification = (data !== null);
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onAdd() {
    const unit = new Unit();
    unit.id = this.form.get('id').value;
    unit.name = this.form.get('name').value;
    unit.symbol = this.form.get('symbol').value;

    this.dialogRef.close(unit);
  }

}
