import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'fileSize',
  standalone: true,
})
export class FileSizePipe implements PipeTransform {
  transform(bytes: number | undefined, precision: number = 2): string {
    if (!bytes || isNaN(bytes) || !isFinite(bytes)) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const number = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, number)).toFixed(precision) + ' ' + units[number];
  }

}
