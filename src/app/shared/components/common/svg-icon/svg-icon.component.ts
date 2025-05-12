// svg-icon.component.ts
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-svg-icon',
  template: '<div [class]="className" [innerHTML]="svgContent"></div>',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent implements OnInit, OnChanges {
  @Input() iconName!: string;
  @Input() className: string = '';

  svgContent: SafeHtml = '';

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private _cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadSvg();
  }

  ngOnChanges() {
    this.loadSvg();
  }

  private loadSvg() {
    this.http.get(`/assets/icons/vuesax/linear/${this.iconName}.svg`, { responseType: 'text' })
      .pipe(
        catchError((err) => {
          return of('');
        })
      )
      .subscribe(svg => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
        this._cdRef.markForCheck();
      });
  }
}
