import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DialogRef } from '@shared/components/plugins/dialog';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { SuspenderPopup } from '../suspender-popup/suspender-popup';

@Component({
  selector: 'app-renovar-popup',
  imports: [ButtonComponent, SvgIconComponent],
  templateUrl: './renovar-popup.html',
  styleUrl: './renovar-popup.scss',
})
export class RenovarPopup {
  dialogService = inject(DialogRef<SuspenderPopup, boolean>);

  aceptar() {
    this.dialogService.close(true);
  }
  cancelar() {
    this.dialogService.close(false);
  }
}
