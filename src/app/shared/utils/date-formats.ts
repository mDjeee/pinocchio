// date-formats.ts
import { MatDateFormats } from '@angular/material/core';

export const LOCAL_DATE_FORMATS: MatDateFormats = {
  parse: {
    // whenever someone types in the input, treat it as YYYY-MM-DD
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    // how the calendar & inputs will render
    dateInput:        'YYYY-MM-DD',
    monthLabel:       'MMM YYYY',
    monthYearLabel:   'YYYY MMM',
    dateA11yLabel:    'YYYY-MM-DD',
    monthYearA11yLabel:'YYYY MMMM',
  }
};
