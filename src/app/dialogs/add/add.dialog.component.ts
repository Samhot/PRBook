import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
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
  addOnBlur = true;
  selected = true;

  separatorKeysCodes = [ENTER, COMMA];

  movementsIds = new FormControl();

  filteredMouvs: Observable<any[]>;

  mouvs = [
    'Deadlift',
  ];

  allMouvs = [
    'Back Squat', 'Front Squat', 'OVHS', 'Deadlift', 'Thrusters', 'Clean', 'Clean & Jerk', 'Push Press', 'Bench Press',
    'Pull-Up', 'HSPU', 'Box Jump', 'Handstand Walk', 'Push-up', 'Bar Muscle-Up', 'Ring Muscle-Up', 'Bear Walk', 'Burpee',
    'Row', 'Ski erg', 'Assault Bike',
    'Run', 'Swim'
  ];

  wodTypes = [
    {value: '0', viewValue: 'Time'},
    {value: '1', viewValue: 'Rounds + Reps'},
    {value: '2', viewValue: 'Reps'},
    {value: '3', viewValue: 'Charge'},
    {value: '4', viewValue: 'Autre/Texte'},
    {value: '5', viewValue: 'Pas de score'}
  ];

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  @ViewChild('mouvInput') mouvInput: ElementRef;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Wod,
              public dataService: DataService) {
                this.filteredMouvs = this.movementsIds.valueChanges.pipe(
                  startWith(null),
                  map((mouv: string | null) => mouv ? this.filter(mouv) : this.allMouvs.slice()));
            }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our mouv
    if ((value || '').trim()) {
      this.mouvs.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.movementsIds.setValue(null);
  }

  remove(mouv: any): void {
    const index = this.mouvs.indexOf(mouv);

    if (index >= 0) {
      this.mouvs.splice(index, 1);
    }
  }

  filter(name: string) {
    return this.allMouvs.filter(mouv =>
        mouv.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selectedChip(event: MatAutocompleteSelectedEvent): void {
    this.mouvs.push(event.option.viewValue);
    this.mouvInput.nativeElement.value = '';
    this.movementsIds.setValue(null);
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

  public confirmAdd(mouvs: Array<any>): void {
    this.data.movementsIds = JSON.stringify(mouvs);
    this.dataService.addWod(this.data);
  }
}
