import { Component, OnInit } from '@angular/core';
import { MouvService } from '../services/mouv.service';
import { Mouvement } from '../_models/mouvements';

@Component({
  selector: 'app-mouvements',
  templateUrl: './mouvements.component.html',
  styleUrls: ['./mouvements.component.css']
})
export class MouvementsComponent implements OnInit {

  mouvs: Mouvement[];

  constructor(private mouvService: MouvService) { }

  ngOnInit() {
    this.getMouvs();
  }

  getMouvs(): void {
    this.mouvService.getMouvs()
        .subscribe(mouvs => this.mouvs = mouvs);
  }

}
