import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer-tab',
  templateUrl: './footer-tab.component.html',
  styleUrls: ['./footer-tab.component.scss'],
})
export class FooterTabComponent implements OnInit {

  @Input()
  footerElements: {name: string; selectedTab: string; icon: string}[] = [];

  @Input()
  selectedTab: string;

  @Output()
  private elementSelect = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  select(element: {name: string; selectedTab: string; icon: string}) {
    this.elementSelect.emit(element.selectedTab);
    this.selectedTab = element.selectedTab;
  }

}
