import { Injectable } from '@angular/core';

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

  removeFlag(id) {
    var currentFlagged = new Set(JSON.parse(localStorage.getItem('flagged')));
    currentFlagged.delete(id);
    localStorage.setItem('flagged', JSON.stringify(Array.from(currentFlagged)));
  }

  getFlagged() {
    return JSON.parse(localStorage.getItem('flagged'));
  }
}
