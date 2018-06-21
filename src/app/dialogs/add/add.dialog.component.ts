import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { Mouvement } from '../../_models/mouvements';
import { Wod } from '../../_models/wod';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;

  separatorKeysCodes = [ENTER, COMMA];

  fruitCtrl = new FormControl();

  filteredFruits: Observable<any[]>;

  fruits = [
  ];

  allFruits = [
    'Apple',
    'Lemon',
    'Lime',
    'Orange',
    'Strawberry'
  ];

  private API_URL = 'http://localhost:5000';
  dataChange: BehaviorSubject<Mouvement[]> = new BehaviorSubject<Mouvement[]>([]);

  @ViewChild('fruitInput') fruitInput: ElementRef;

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Wod,
              public dataService: DataService,
              private httpClient: HttpClient) {
                this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
                  startWith(null),
                  map((fruit: string | null) => fruit ? this.filter(fruit) : this.allFruits.slice()));
              }

  getAllWods(): void {
    this.httpClient.get<Wod[]>(this.API_URL + '/mouvs')
    .subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  filter(name: string) {
    return this.allFruits.filter(fruit =>
        fruit.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dataService.addWod(this.data);
  }
}
