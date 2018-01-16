import { Component, OnInit } from '@angular/core';
import { Wod } from '../wod';
import { WodService } from '../wod.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  wods: Wod[] = [];

  constructor(private wodService: WodService) { }

  ngOnInit() {
    this.getWods();
  }

  getWods(): void {
    this.wodService.getWods()
      .subscribe(wods => this.wods = wods.slice(1,5));
  }

}
