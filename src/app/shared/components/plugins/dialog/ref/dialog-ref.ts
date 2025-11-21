import { Subject } from 'rxjs';

export class DialogRef<T, R = any> {
  private resultSubject = new Subject<R | undefined>();

  constructor() {}

  close(result?: R): void {
    this.onCloseFn(result);
    this.resultSubject.next(result);
    this.resultSubject.complete();
  }

  afterClosed() {
    return this.resultSubject.asObservable();
  }

  setComponentInstance(componentInstance: T) {
    this.componentInstance = componentInstance;
  }

  onCloseFn!: (result: R | undefined) => void;

  public componentInstance!: T;
}
