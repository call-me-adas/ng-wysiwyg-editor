import {Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import * as HtmlValidator from 'html-tag-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild('textAreaElement') textAreaElement: ElementRef;
  htmlFormat = ''
  error: string = '';

  constructor() {
  }

  insertElement(el) {
    console.log(this.textAreaElement.nativeElement.selectionStart);
    console.log(this.textAreaElement.nativeElement.selectionEnd);

    let a = this.htmlFormat;
    let b = "<"+el+">";
    let b2 = "</"+el+">";
    let posStart = this.textAreaElement.nativeElement.selectionStart;
    let posEnd = this.textAreaElement.nativeElement.selectionEnd;
    if(posStart === posEnd) {
      this.htmlFormat = [a.slice(0, posStart), b, b2, a.slice(posStart)].join('');
    } else {
      this.htmlFormat = [a.slice(0, posStart), b, a.slice(posStart, posEnd), b2, a.slice(posEnd)].join('');
    }
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
