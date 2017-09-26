import { Injectable } from '@angular/core';

import { Applicant } from 'app/models/applicant';
import { APPLICANTS } from 'assets/data/applicants';

@Injectable()
export class DataService {
  //This would be a Promise/Observable in a production environment
  getApplicants(): Applicant[] {
    return APPLICANTS;
  }
}