import { Component, OnInit } from '@angular/core';

import { Wod } from '../wod';
import { WodService } from '../wod.service';

@Component({
  selector: 'app-wods',
  templateUrl: './wods.component.html',
  styleUrls: ['./wods.component.css']
})
export class WodsComponent implements OnInit {

  wods: Wod[];
  
  constructor(private wodService: WodService) { }

  ngOnInit() {
    this.getWods();
  }

  getWods(): void {
    this.wodService.getWods()
        .subscribe(wods => this.wods = wods);
  }

}
