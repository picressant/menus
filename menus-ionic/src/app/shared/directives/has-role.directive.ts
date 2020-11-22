import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FoodAuthService } from "@services/food-auth.service";
import { Role } from "@models/enums/role.enum";

@Directive({
    selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {
    // the role the user must have
    @Input() appHasRole: Role;

    stop$ = new Subject();

    isVisible = false;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private authService: FoodAuthService
    ) {
    }

    ngOnInit() {
        this.authService.user.pipe(
            takeUntil(this.stop$)
        ).subscribe(user => {
            if (!user) {
                this.viewContainerRef.clear();
            }
            else {
                if (user.role === this.appHasRole) {
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
