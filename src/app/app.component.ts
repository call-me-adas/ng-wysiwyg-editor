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

  insertImage() {
    let src = prompt('Give src');
    let a = this.htmlFormat;
    let posStart = this.textAreaElement.nativeElement.selectionStart;
    this.htmlFormat = [a.slice(0, posStart), "<img class='image' src='", src, "' />" ,a.slice(posStart)].join('');
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
