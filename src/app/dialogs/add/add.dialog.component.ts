import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { MouvService } from '../../services/mouv.service';
import { Mouvement } from '../../_models/mouvements';
import { Wod } from '../../_models/wod';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;

  separatorKeysCodes = [ENTER, COMMA];

  mouvCtrl = new FormControl();

  filteredMouvs$: Observable<Mouvement[]>;

  mouvs = [];

  allMouvs = [];

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  @ViewChild('mouvInput') mouvInput: ElementRef;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Wod,
              public dataService: DataService,
              private mouvService: MouvService) {

              }

  ngOnInit() {
    this.getMouvs();
    this.filteredMouvs$ = this.mouvCtrl.valueChanges.pipe(
      startWith(null),
      map((mouv: string | null) => mouv ? this.filter(mouv) : this.allMouvs.slice()));
  }


  getMouvs(): void {
    this.mouvService.getMouvs()
        .subscribe(mouvs => this.allMouvs = mouvs);
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

    this.mouvCtrl.setValue(null);
  }

  remove(mouv: any): void {
    const index = this.mouvs.indexOf(mouv);

    if (index >= 0) {
      this.mouvs.splice(index, 1);
    }
  }

  filter(name: string) {
    return this.allMouvs.filter(mouv =>
        mouv.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.mouvs.push(event.option.viewValue);
    this.mouvInput.nativeElement.value = '';
    this.mouvCtrl.setValue(null);
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
