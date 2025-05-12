import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true,
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) return '—';

    const phoneStr = value.toString();
    if (phoneStr.startsWith('+')) {
      return phoneStr; // Already formatted
    }

    // Format as +998 XX XXX XX XX
    return `+998 ${phoneStr.substring(0, 2)} ${phoneStr.substring(2, 5)} ${phoneStr.substring(5, 7)} ${phoneStr.substring(7)}`;
  }
}
