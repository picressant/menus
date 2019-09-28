import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ResetPasswordDialogComponent } from "../../main/user/components/reset-password-dialog/reset-password-dialog.component";
import { ConfirmationModalComponent } from "../components/modals/confirmation-modal/confirmation-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  current$: Subject<boolean>;

  constructor(
    private dialog: MatDialog
  ) {
  }

  confirm(text: string) {
    this.current$ = new Subject<boolean>();

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: text
    });

    dialogRef.afterClosed().subscribe((data: boolean) => {
      this.current$.next(data);
      this.current$.complete();
    });

    return this.current$;
  }
}
