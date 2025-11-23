import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'paginado-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginado-tabla.component.html',
  styleUrl: './paginado-tabla.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginadoTablaComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  maxVisiblePages: number = 3;

  onChangePage(page: number | string): void {
    if (typeof page === 'string') return;
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.onChangePage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.onChangePage(this.currentPage + 1);
    }
  }

  getVisiblePages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const visiblePages: (number | string)[] = [];

    if (total <= 8) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    visiblePages.push(1); // Siempre mostrar la primera página

    let leftGap = current > 4;
    let rightGap = current < total - 3;

    const range = [];
    const startPage = Math.max(2, current - 1);
    const endPage = Math.min(total - 1, current + 1);

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    while (
      visiblePages.length +
        range.length +
        (leftGap ? 1 : 0) +
        (rightGap ? 1 : 0) <
      7
    ) {
      if (range[0] > 2) {
        range.unshift(range[0] - 1);
      } else if (range[range.length - 1] < total - 1) {
        range.push(range[range.length - 1] + 1);
      } else {
        break;
      }
    }

    if (leftGap) {
      visiblePages.push('...');
    }

    visiblePages.push(...range);

    if (rightGap) {
      visiblePages.push('...');
    }

    visiblePages.push(total); // Siempre mostrar la última página

    return visiblePages;
  }

  get hasDots(): boolean {
    return this.totalPages > this.maxVisiblePages;
  }
}
