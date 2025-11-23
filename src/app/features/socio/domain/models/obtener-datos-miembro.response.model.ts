

export interface ObtenerDatosMiembroResponse {
  readonly id: number;

  //info personal
  readonly nombre: string;
  readonly apellidos: string;
  readonly fechaNacimiento: string;
  readonly edad: number;
  readonly estadoCivil: string;

  //info de contacto
  readonly email: string;
  readonly celular: string;
  readonly direccion: string;

  //lista beneficios

  readonly listaBeneficios: ListaBeneficios[];

  //lista invitados
  readonly listaInvitados: ListaInvitados[];

}

export interface ListaBeneficios {
  readonly nombreApellido: string;
  readonly dni: string;
  readonly parentesco: string;
}

export interface ListaInvitados {
  readonly nombreApellido: string;
  readonly dni: string;
  readonly parentesco: string;
}
