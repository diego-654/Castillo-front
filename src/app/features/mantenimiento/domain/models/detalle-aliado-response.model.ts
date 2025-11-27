

export interface DetalleAliadoResponse {
  readonly id: number;

  // info de la empresa
  readonly nombre: string;
  readonly ruc: string;
  readonly fechaIcorporacion: string;
  readonly fechaCaducidad: string;
  readonly socioRepresentante: string;

  //informacion de contacto
  readonly listContacto: ListContacto[];

  // lista beneficios
  readonly listaBeneficios: ListaMembresias[];
}

export interface ListContacto {
  readonly id: number;
  readonly socioNombre: string;
  readonly correo: string;
  readonly telefono: string;
  readonly direccion: string;
}



export interface ListaMembresias {
  readonly id: number;
  readonly nombre: string;
  readonly beneficios: Beneficios[];
}

export interface Beneficios {
  readonly id: number;
  readonly nombre: string;
}
