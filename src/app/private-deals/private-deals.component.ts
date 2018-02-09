import { Component, OnInit, OnDestroy } from '@angular/core';
import { DealService } from '../_services/deal.service';
import { Subscription } from 'rxjs/Subscription';
import { Deal } from '../_models/deal';

@Component({
  selector: 'app-private-deals',
  templateUrl: './private-deals.component.html',
  styleUrls: ['./private-deals.component.css']
})
export class PrivateDealsComponent implements OnInit, OnDestroy {
  dealsSub: Subscription;
  privateDeals: Deal[];
  error: any;

  constructor(public dealService: DealService) { }

  ngOnInit() {
    this.dealsSub = this.dealService
      .getPrivateDeals()
      .subscribe(
        deals => this.privateDeals = deals,
        err => error => this.error = err
      );
  }

  ngOnDestroy() {
    this.dealsSub.unsubscribe();
  }

}