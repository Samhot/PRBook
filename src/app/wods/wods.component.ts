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

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.wodService.addWod({ name } as Wod)
      .subscribe(wod => {
        this.wods.push(wod);
      });
  }

  delete(wod: Wod): void {
    this.wods = this.wods.filter(w => w !== wod);
    this.wodService.deleteWod(wod).subscribe();
  }

}
