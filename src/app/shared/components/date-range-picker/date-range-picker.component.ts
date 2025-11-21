import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  EventEmitter,
  inject,
  input,
  Output,
  signal,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [
    CommonModule,
    CalendarComponent,
    InputComponent,
    ButtonComponent,
    FormsModule,
  ],
  providers: [DatePipe],
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.scss',
})
export class DateRangePickerComponent {
  private datePipe = inject(DatePipe);
  @Output() rangoFechasChange = new EventEmitter<{
    inicio: Date | null;
    fin: Date | null;
  }>();

  value = input<[Date | null, Date | null]>([null, null]);

  @ViewChild('optionsTemplate') optionsTemplate!: TemplateRef<any>;
  @ViewChild('calendarInput') calendarInput!: ElementRef;

  fechaSeleccionada1 = signal<Date | null>(null);
  fechaSeleccionada2 = signal<Date | null>(null);
  overlayRef: OverlayRef | undefined;
  type = input<'small' | 'normal'>('normal');

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && this.value) {
      const [f1, f2] = this.value();

      this.fechaSeleccionada1.set(f1);
      this.fechaSeleccionada2.set(f2);
    }
  }

  valueFormateado = computed(() => {
    const [f1, f2] = this.value();

    const formatted1 = f1 ? this.datePipe.transform(f1, 'MMM d, y', 'es') : '';
    const formatted2 = f2 ? this.datePipe.transform(f2, 'MMM d, y', 'es') : '';
    return f1 || f2 ? `${formatted1} – ${formatted2}` : '';
  });

  fechaFormateada1 = computed(() => {
    const fecha = this.fechaSeleccionada1();
    const valor = fecha
      ? this.datePipe.transform(fecha, 'MMM d, y', 'es')
      : '';

    return valor ?? ''; // ← convierte null en ''
  });


  fechaFormateada2 = computed(() => {
    const fecha = this.fechaSeleccionada2();
    const valor = fecha
      ? this.datePipe.transform(fecha, 'MMM d, y', 'es')
      : '';

    return valor ?? '';
  });


  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) { }

  onFecha1Change(fecha: Date | null) {
    this.fechaSeleccionada1.set(fecha);
  }

  onFecha2Change(fecha: Date | null) {
    this.fechaSeleccionada2.set(fecha);
  }

  openOptions() {
    if (!this.calendarInput) return;
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.calendarInput.nativeElement)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 8,
        },
      ]);

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop',
        positionStrategy,
        width: 656,
      });

      this.overlayRef.backdropClick().subscribe(() => {
        this.closeOptions();
      });
    }

    if (!this.overlayRef.hasAttached()) {
      this.overlayRef.attach(
        new TemplatePortal(this.optionsTemplate, this.viewContainerRef)
      );
    }

    this.fechaSeleccionada1.set(this.value()[0]);
    this.fechaSeleccionada2.set(this.value()[1]);
  }

  closeOptions() {
    this.overlayRef?.detach();
  }

  cancelar() {
    //si se cierra el menu, se resetea el valor de la fecha
    this.fechaSeleccionada1.set(this.value()[0]);
    this.fechaSeleccionada2.set(this.value()[1]);

    this.closeOptions();
  }

  //Ene 6, 2024 – Ene 13, 2024 searchINputvalue
  aceptar() {
    //validar si la fecha nueva no es igual a la anterior
    if (
      this.fechaSeleccionada1() !== this.value()[0] ||
      this.fechaSeleccionada2() !== this.value()[1]
    ) {
      this.rangoFechasChange.emit({
        inicio: this.fechaSeleccionada1(),
        fin: this.fechaSeleccionada2(),
      });
    }

    this.closeOptions();
  }
}
