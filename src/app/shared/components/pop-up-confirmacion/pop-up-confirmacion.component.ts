import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-pop-up-confirmacion',
  standalone: true,
  imports: [MatDialogModule, ButtonComponent],
  templateUrl: './pop-up-confirmacion.component.html',
  styleUrl: './pop-up-confirmacion.component.scss',
})
export class PopUpConfirmacionComponent {
  readonly dialogRef: PopUpConfirmacion = inject(
    MatDialogRef<PopUpConfirmacionComponent>
  );

  readonly data = inject<DataConfirmacion>(MAT_DIALOG_DATA);
  readonly title: string = this.data.title;
  readonly subTitle: string = this.data.subTitle;

  cancelar(): void {
    this.dialogRef.close(false);
  }

  aceptar() {
    this.dialogRef.close(true);
  }
}

export type PopUpConfirmacion = MatDialogRef<
  PopUpConfirmacionComponent,
  boolean
>;

export interface DataConfirmacion {
  title: string;
  subTitle: string;
}
