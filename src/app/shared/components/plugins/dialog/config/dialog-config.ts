export interface DialogConfig<T = any> {
  data?: T;
  width?: string;
  maxWidth?: string;
  height?: string;
  disableClose?: boolean;
  panelClass?: string;
  backdropClass?: string;
  hasBackdrop?: boolean;
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}
