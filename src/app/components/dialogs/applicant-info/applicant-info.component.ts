import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Applicant } from 'app/models/applicant';

/**
 * Read-only application info dialog
 */

@Component({
  selector: 'app-applicant-info',
  templateUrl: './applicant-info.component.html',
  styleUrls: ['./applicant-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApplicantInfoComponent {
  applicant: Applicant;
  availabilityDays: Array<string>;

  constructor(
    public dialogRef: MdDialogRef<ApplicantInfoComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) 
    { 
      this.applicant = data.applicantData;
      this.availabilityDays = Object.keys(this.applicant.availability);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
