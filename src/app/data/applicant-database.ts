import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { DataService } from 'app/services/data.service';
import { StorageService } from 'app/services/storage.service';
import { Applicant } from 'app/models/applicant';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

export class ApplicantDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<Applicant[]> = new BehaviorSubject<Applicant[]>([]);
    dataService = new DataService();
    storageService = new StorageService;

    get data(): Applicant[] {
        var applicants = this.dataService.getApplicants();
        if (this.storageService.checkLocalStorage()) {
            var flagged = this.storageService.getFlagged();
            applicants.map(applicant => {
                applicant.flag = flagged.includes(applicant.id);
            })
        }
        return applicants;
    }

    constructor() {
        this.dataChange.next(this.data);
    }

}