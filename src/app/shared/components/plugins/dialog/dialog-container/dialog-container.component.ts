import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogConfig } from '..';
import { DIALOG_CONFIG } from '../token/dialog-token';

@Component({
  selector: 'app-dialog-container',
  imports: [CommonModule],
  templateUrl: './dialog-container.component.html',
  styleUrl: './dialog-container.component.scss',
})
export class DialogContainerComponent {
  @ViewChild('portalOutlet', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  config: DialogConfig = inject(DIALOG_CONFIG);
}
