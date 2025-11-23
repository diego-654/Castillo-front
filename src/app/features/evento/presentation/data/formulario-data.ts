import { FormularioEventoRequest, TipoInputType } from "@features/evento/domain/models/formulario-evento-request.model";


export const formularioData: FormularioEventoRequest = {
  id: 1,
  lista: [
    {
      typeFormulario: 'Información Personal',
      campos: {
        lista: [
          {
            label: 'Nombres',
            type: TipoInputType.TEXT,
            formControlName: 'nombres',
          },
          {
            label: 'Apellidos',
            type: TipoInputType.TEXT,
            formControlName: 'apellidos',
          },
          {
            label: 'Edad',
            type: TipoInputType.NUMBER,
            formControlName: 'edad',
          },
          {
            label: 'Fecha de nacimiento',
            type: TipoInputType.DATE,
            formControlName: 'fechaNacimiento',
          },
          {
            label: 'Ciudad',
            type: TipoInputType.TEXT,
            formControlName: 'ciudad',
          },
          {
            label: 'Fecha de finalizacion',
            type: TipoInputType.DATE,
            formControlName: 'fechaFinalizacion',
          },
        ],
      },
    },
    {
      typeFormulario: 'Información de contacto',
      campos: {
        lista: [
          {
            label: 'Correo electrónico',
            type: TipoInputType.TEXT,
            formControlName: 'correoElectronico',
          },
          {
            label: 'Número de celular',
            type: TipoInputType.NUMBER,
            formControlName: 'numeroCelular',
          },
        ],
      },
    },

  ],
}

