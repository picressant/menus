import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(
    private toaster: ToastrService
  ) { }

  info(text: string) {
    this.toaster.info(text);
  }
}
