import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { merge, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { WodService } from '../services/wod.service';
import { Wod } from '../_models/wod';


@Component({
  selector: 'app-wods',
  templateUrl: './wods.component.html',
  styleUrls: ['./wods.component.css']
})
export class WodsComponent implements OnInit, AfterViewInit {

  wods: Wod[];

  displayedColumns = ['id', 'title', 'description', 'type', 'coachesNotes'];
  data = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private wodService: WodService,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.getWods();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.data.sort = this.sort;

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.getJson();
        }),
        map(data => {
          return data;
        })
      ).subscribe(data => this.data = data);
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.data.filter = filterValue;
  }

  getWods(): void {
    this.wodService.getWods()
        .subscribe(wods => this.wods = wods);
  }

  getJson(): Observable<any> {
    const href = 'http://localhost:5000/wods';
    return this.http.get<any>(href);
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.wodService.addWod({ title } as Wod)
      .subscribe(wod => {
        this.wods.push(wod);
      });
  }

  delete(wod: Wod): void {
    this.wods = this.wods.filter(w => w !== wod);
    this.wodService.deleteWod(wod).subscribe();
  }

}

