import { Component, OnInit } from '@angular/core';
import { Wod } from '../wod';
import { WODS } from '../mock-wods';

@Component({
  selector: 'app-wods',
  templateUrl: './wods.component.html',
  styleUrls: ['./wods.component.css']
})
export class WodsComponent implements OnInit {

  wods = WODS;

  selectedWod: Wod;

  onSelect(wod: Wod): void {
    this.selectedWod = wod;
  }

  constructor() { }

  ngOnInit() {
  }

}
