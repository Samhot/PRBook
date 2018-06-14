import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WodService } from '../services/wod.service';
import { Wod } from '../_models/wod';



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

  save(): void {
    this.wodService.updateWod(this.wod)
      .subscribe(() => this.goBack());
  }

}
