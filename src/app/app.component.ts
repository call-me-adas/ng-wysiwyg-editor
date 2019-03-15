import {Component, ViewEncapsulation} from '@angular/core';
import * as HtmlValidator from 'html-tag-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  htmlFormat = ''
  error: string = '';

  constructor() {
  }

  typeTextarea(event) {
    HtmlValidator(this.htmlFormat, (err, ast) => {
      if (err) {
        this.error = err.message;
      } else {
        this.error = '';
      }
    });
  }
}
