import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MdSort, MdSnackBar, MdDialog, MdPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ApplicantDatabase } from 'app/data/applicant-database';
import { ApplicantDataSource } from 'app/data/applicant-datasource';
import { StorageService } from 'app/services/storage.service';
import { ApplicantInfoComponent } from 'app/components/dialogs/applicant-info/applicant-info.component';

/**
 * Main table functionality including connecting to the live datasource
 */

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {
  displayedColumns = ['name', 'position', 'experience', 'applied', 'info', 'flag'];
  applicantDatabase = new ApplicantDatabase();
  storageService = new StorageService;
  dataSource: ApplicantDataSource | null;

  @ViewChild(MdSort) sort: MdSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(public snackBar: MdSnackBar, public dialog: MdDialog) { }

  ngOnInit() {
    this.dataSource = new ApplicantDataSource(this.applicantDatabase, this.sort, this.paginator);
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

  infoClicked(row) {
    let dialogRef = this.dialog.open(ApplicantInfoComponent, {
      data: { applicantData: row }
    });
  }
}