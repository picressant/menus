import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  isOpen = false;
  isOpenChanges : Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router) {
    this.isOpenChanges.subscribe((value) => {
      this.isOpen = value
    });
  }

  toggleOpen(isOpen: boolean) {
    this.isOpenChanges.next(isOpen);
  }
}
