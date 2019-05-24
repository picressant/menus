import { Component, OnInit, Output } from '@angular/core';
import { Recette } from '../models/recette.model';
import { RecetteService } from '../recette.service';
import { Router } from '@angular/router';
import { RecetteType } from '../models/recette-type.enum';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-search-recette',
  templateUrl: './search-recette.component.html',
  styleUrls: ['./search-recette.component.less']
})
export class SearchRecetteComponent implements OnInit {

    searchValue = '';
    _selectText = "Voir plus";
    _isLoading = false;

    _isLoadingID: any;

    recettes: Recette[];

    @Input()
    isWeekSearch: boolean;

    @Output()
    choose: EventEmitter<Recette>;

  constructor(
      private recetteService: RecetteService,
      private router: Router
  ) {
    this.isWeekSearch = false;
    this.choose = new EventEmitter<Recette>();
   }

  ngOnInit() {
    if (this.isWeekSearch) {
      this._selectText = "Selectionner";
    }
    this._searchRecette();
  }

  private _setLoading() {
    this._isLoadingID = setTimeout( () => this._isLoading = true, 300);
  }

  private _clearLoading() {
    clearTimeout(this._isLoadingID);
    this._isLoading = false;
  }

  onChangeEvent() {
    this._searchRecette();
  }

  private _searchRecette() {
    this._setLoading();
    this.recetteService.searchRecette(this.searchValue)
    .pipe( finalize( () => this._clearLoading()))
    .subscribe( (iRecettes: Recette[]) => this.recettes = iRecettes,
  (err) => alert(err));
  }

  selectRecette(iRecette: Recette) {
    if (this.isWeekSearch)
      this.choose.emit(iRecette);
    else
      this.router.navigate(['recette', iRecette.id]);
  }

  addRecette() {
    this.router.navigate(['recette']);
  }

}
