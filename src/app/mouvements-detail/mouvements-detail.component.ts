import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MouvService } from '../services/mouv.service';
import { Mouvement } from '../_models/mouvements';

@Component({
  selector: 'app-mouvements-detail',
  templateUrl: './mouvements-detail.component.html',
  styleUrls: ['./mouvements-detail.component.css']
})
export class MouvementsDetailComponent implements OnInit {

  @Input() mouv: Mouvement;

  constructor(
    private route: ActivatedRoute,
    private mouvService: MouvService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMouv();
  }

  getMouv(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.mouvService.getMouv(id)
      .subscribe(mouv => this.mouv = mouv);
  }

  goBack(): void {
    this.location.back();
  }

}
