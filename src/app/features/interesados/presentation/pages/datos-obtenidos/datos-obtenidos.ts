import { Component, computed, signal } from '@angular/core';
import { SearchInputComponent } from '@shared/components/search-input/search-input.component';
import { SelectComponent } from "@shared/components/select/select.component";

@Component({
  selector: 'app-datos-obtenidos',
  imports: [SearchInputComponent, SelectComponent],
  templateUrl: './datos-obtenidos.html',
  styleUrl: './datos-obtenidos.scss',
})
export default class DatosObtenidos {
  searchInputCheck = signal('');
  searchInputDrag = signal('');

  filteredChecksColumns = computed(() => {});

  filteredDragColumns = computed(() => {});
}
