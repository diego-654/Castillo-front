import { Pipe, PipeTransform } from '@angular/core';
import { TipoMonedaType } from './tipo-moneda-type.model';

@Pipe({ name: 'monto', standalone: true })
export class MontoPipe implements PipeTransform {
  transform(
    value: number,
    monedaType: TipoMonedaType,
    decimales: number = 2
  ): string {
    if (value == null) return '';

    const currencyMap: Record<
      TipoMonedaType,
      { locale: string; currency: string }
    > = {
      soles: { locale: 'es-PE', currency: 'PEN' },
      dolares: { locale: 'en-US', currency: 'USD' },
    };

    const config = currencyMap[monedaType];

    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.currency,
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales,
    }).format(value);
  }
}
