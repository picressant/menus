import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RecetteService } from '../recette.service';
import { Router } from '@angular/router';
import { Recette } from '../models/recette.model';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IngredientAvecQuantite } from '../models/ingredient-quantite.model';

@Component({
  selector: 'menus-show-recette',
  templateUrl: './show-recette.component.html',
  styleUrls: ['./show-recette.component.less']
})
export class ShowRecetteComponent implements OnInit, AfterViewInit {

  @ViewChild('wrapper') container : ElementRef;

  recetteForm: FormGroup;
  _id: number;
  _isCreationMode: boolean;
  _isEditable: boolean;
  _isRecette = true;

  listOfIngredient: IngredientAvecQuantite[];

  calculatedLeftIngredient = -100000;
  calculatedLeftRecette = 0;

  constructor(private formBuilder: FormBuilder,
    private recetteService: RecetteService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private el:ElementRef) {

    this._isEditable = false;

    this._id = parseInt(this.route.snapshot.paramMap.get("id"));
    if (isNaN(this._id))
      this._id = null;

    this.recetteForm = this.formBuilder.group({
      nom: ['', Validators.required],
      tempsPreparation: ['', Validators.required],
      tempsCuisson: [''],
      nbPersonnes: ['', [Validators.required]],
      type: ['', Validators.required]
    });
  }

  ngOnInit() {
    this._isCreationMode = (this._id === null);

    if (!this._isCreationMode) {
      this._loadRecette();           
    }
    else {
      this._isEditable = true;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.calculatedLeftIngredient = this.container.nativeElement.offsetWidth, 50);    
  }

  public hasError(controlName: string, errorName: string) {
    return this.recetteForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (!this._isEditable) {
      this.recetteForm.enable();
      this._isEditable = true;
    }
    else {
      if (this._isCreationMode) {
        this.recetteService.addRecette(this._rebuildRecette()).subscribe(
          (iRecette: Recette) => {
            this.recetteForm.reset(iRecette);
            this.recetteForm.disable(); 
            this._isEditable = false;

            this._id = iRecette.id;
            this._isCreationMode = false;            
            this.snackBar.open('Recette ajoutée', 'Ok', {
              duration: 3000
            });
          },
          (error) => alert(error.customMessage)
        );
      }
      else {
        this.recetteService.updateRecette(this._rebuildRecette()).subscribe(
          (iRecette: Recette) => {
            this.recetteForm.reset(iRecette);
            this.recetteForm.disable(); 
            this._isEditable = false;
                            
            this.snackBar.open('Recette modifiée', 'Ok', {
              duration: 3000
            });
          },
          (error) => alert(error.customMessage)
        );      
      }
    }
  }

  onDelete() {
    this.recetteService.deleteRecette(this._id).subscribe(
      () => {
        this.snackBar.open('Recette supprimée', 'Ok', {
          duration:3000
        });
        this.router.navigate(['']);
      },
      (error) => {
        alert(error.customMessage);
      }
    )
  }

  onPanLeft(event) {    
    if (this._isRecette) {
      this.calculatedLeftRecette = - this.calculatedLeftIngredient;
      this.calculatedLeftIngredient = 0;
      this._isRecette = false;
    }
  }

  onPanRight(event) {    
    if (!this._isRecette) {
      this.calculatedLeftIngredient = - this.calculatedLeftRecette;
      this.calculatedLeftRecette = 0;
      this._isRecette = true;
    }
  }

  private _rebuildRecette() {
    const lRecette = new Recette(
      this.recetteForm.controls['nom'].value,
      this.recetteForm.controls['tempsPreparation'].value,
      this.recetteForm.controls['tempsCuisson'].value,
      this.recetteForm.controls['nbPersonnes'].value,
      this.recetteForm.controls['type'].value
    );

    lRecette.id = this._id;

    return lRecette;
  }


  private _loadRecette() {
    this.recetteService.getRecette(this._id).subscribe((iRecette: Recette) => {
      this.recetteForm.reset(iRecette);
      this.recetteForm.disable(); 
      this._isEditable = false;

      this.recetteService.getListeIngredient(this._id).subscribe(iList => this.listOfIngredient = iList );
    });
  }

}
