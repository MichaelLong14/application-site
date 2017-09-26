import { Injectable } from '@angular/core';

import { Applicant } from 'app/models/applicant';
import { APPLICANTS } from 'assets/data/applicantData';

/**
 * Simple service to get mock data from a local file
 */

@Injectable()
export class DataService {
  //This would be a Promise/Observable from an http call in a production environment
  getApplicants(): Applicant[] {
    return APPLICANTS;
  }
}