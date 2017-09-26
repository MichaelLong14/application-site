import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MdSort, MdSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ApplicantDatabase } from 'app/data/applicant-database';
import { ApplicantDataSource } from 'app/data/applicant-datasource';
import { StorageService } from 'app/services/storage.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns = ['name', 'position', 'experience', 'applied', 'info', 'flag'];
  applicantDatabase = new ApplicantDatabase();
  storageService = new StorageService;
  dataSource: ApplicantDataSource | null;

  @ViewChild(MdSort) sort: MdSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.dataSource = new ApplicantDataSource(this.applicantDatabase, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  flagClicked(row) {
    var snackBarText;
    if (this.storageService.checkLocalStorage()) {
      if (row.flag) {
        this.storageService.removeFlag(row.id);
        snackBarText = 'Flag Removed';
      } else {
        this.storageService.addFlag(row.id);
        snackBarText = 'Flag Saved';
      }
    } else {
      snackBarText = 'Storage Disabled';
    }
    row.flag = !row.flag;
    this.openSnackBar(snackBarText);
  }

  deleteClicked(row) {
    //delete row from dataset

    //localstorage
  }

  infoClicked(row) {

  }
}