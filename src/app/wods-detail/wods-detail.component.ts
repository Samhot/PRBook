import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Wod } from '../wod';
import { WodService } from '../wod.service'

@Component({
  selector: 'app-wods-detail',
  templateUrl: './wods-detail.component.html',
  styleUrls: ['./wods-detail.component.css']
})
export class WodsDetailComponent implements OnInit {
  @Input() wod: Wod;

  constructor(
    private route: ActivatedRoute,
    private wodService: WodService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getWod();
  }

  getWod(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.wodService.getWod(id)
      .subscribe(wod => this.wod = wod);
  }

  goBack(): void {
    this.location.back();
  }

}
