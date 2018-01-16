import { Component, OnInit, Input } from '@angular/core';
import { Wod } from '../wod';

@Component({
  selector: 'app-wods-detail',
  templateUrl: './wods-detail.component.html',
  styleUrls: ['./wods-detail.component.css']
})
export class WodsDetailComponent implements OnInit {

  @Input() Wod: Wod;

  constructor() { }

  ngOnInit() {
  }

}
