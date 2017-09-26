import { Component, Inject, ViewEncapsulation } from '@angular/core';

/**
 * Simple nav component that contains a title and github link
 * 
 * This could be easily expanded upon to add a full menu/navigation
 */

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NavComponent {

  constructor() {

  }
}
