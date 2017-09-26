import { Injectable } from '@angular/core';

/**
 * Handles interaction with the browser's LocalStorage to allow for flagging applicants
 */

@Injectable()
export class StorageService {
  localStorageAvailable: boolean;

  constructor() {
    //LocalStorage is difficult to test for because of Safari's private implementation, so we do a functional test once
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('feature_test', 'yes');
        if (localStorage.getItem('feature_test') === 'yes') {
          localStorage.removeItem('feature_test');
          this.localStorageAvailable = true;
        } else {
          this.localStorageAvailable = false;
        }
      } catch (e) {
        this.localStorageAvailable = false;
      }
    } else {
      this.localStorageAvailable = false;
    }
  }

  checkLocalStorage() {
    return this.localStorageAvailable;
  }

  //Add applicant's ID to the localStorage array for persistent flagging
  addFlag(id) {
    var currentFlagged = JSON.parse(localStorage.getItem('flagged'));

    if (currentFlagged && !currentFlagged.includes(id)) {
      currentFlagged.push(id);
      localStorage.setItem('flagged', JSON.stringify(currentFlagged));
    } else if (!currentFlagged) {
      var flagged = [];
      flagged.push(id);
      localStorage.setItem('flagged', JSON.stringify(flagged));
    }
  }

  //Remove applicant's ID from the localStorage array
  removeFlag(id) {
    var currentFlagged = new Set(JSON.parse(localStorage.getItem('flagged')));
    currentFlagged.delete(id);
    localStorage.setItem('flagged', JSON.stringify(Array.from(currentFlagged)));
  }

  //Get all currently flagged applicant ids
  getFlagged() {
    return JSON.parse(localStorage.getItem('flagged'));
  }
}
