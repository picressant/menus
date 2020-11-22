import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Privilege } from "@models/enums/privilege.enum";
import { User } from "@models/user.model";
import { FoodAuthService } from "@services/food-auth.service";

@Directive({
  selector: '[appHasPrivilege]'
})
export class HasPrivilegeDirective implements OnInit, OnDestroy {
  // the role the user must have
  @Input() appHasPrivilege: Privilege;

  stop$ = new Subject();

  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService : FoodAuthService
  ) {
  }

  ngOnInit() {
    this.authService.user.pipe(
      takeUntil(this.stop$)
    ).subscribe((user: User) => {
      if (!user) {
        this.viewContainerRef.clear();
      }
      else {
        let can = false;
        if (this.appHasPrivilege.startsWith("!"))
          can = (user.privileges.indexOf(Privilege[this.appHasPrivilege.toString().substring(1)]) < 0);
        else
          can = (user.privileges.indexOf(this.appHasPrivilege) >= 0);

        if (can) {
          if (!this.isVisible) {
            this.isVisible = true;
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        }
        else {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
      }
    });
  }

  // Clear the subscription on destroy
  ngOnDestroy() {
    this.stop$.next();
  }

}
