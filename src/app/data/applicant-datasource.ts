import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { MdSort, MdPaginator } from '@angular/material';
import { Applicant } from 'app/models/applicant';
import { ApplicantDatabase } from 'app/data/applicant-database';

/**
 * Custom Datasource for use with md-table, provides filtering, sorting, and pagination.
 * 4 Observables provide live updates to the database
 */
export class ApplicantDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _applicantDatabase: ApplicantDatabase, private _sort: MdSort, private _paginator: MdPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Applicant[]> {
    const displayDataChanges = [
      this._applicantDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData().slice().filter((item: Applicant) => {
        let searchStr = (item.name + item.position + item.applied).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });
  }

  disconnect() { }

  /** Returns a sorted copy of the database data. */
  getSortedData(): Applicant[] {
    const data = this._applicantDatabase.data.slice();
    if (!this._sort.active || this._sort.direction == '') { 
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    }

    var sortedData = data.sort((a, b) => {
      let propertyA: boolean | number | string = '';
      let propertyB: boolean | number | string = '';

      switch (this._sort.active) {
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'position': [propertyA, propertyB] = [a.position, b.position]; break;
        case 'experience': [propertyA, propertyB] = [a.experience, b.experience]; break;
        case 'applied': [propertyA, propertyB] = [new Date(a.applied).getTime(), new Date(b.applied).getTime()]; break;
        case 'flag':  [propertyA, propertyB] = [a.flag, b.flag]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    return sortedData.splice(startIndex, this._paginator.pageSize);
  }
}