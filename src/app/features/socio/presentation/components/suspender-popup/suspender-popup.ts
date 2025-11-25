import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DialogRef, DialogService } from '@shared/components/plugins/dialog';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-suspender-popup',
  imports: [ButtonComponent,SvgIconComponent],
  templateUrl: './suspender-popup.html',
  styleUrl: './suspender-popup.scss',
})
export class SuspenderPopup {

  dialogService = inject(DialogRef<SuspenderPopup, boolean>);

  aceptar() {
    this.dialogService.close(true);
  }

  cancelar() {
    this.dialogService.close(false);
  }
}
