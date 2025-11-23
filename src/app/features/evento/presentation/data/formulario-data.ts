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
          },
          {
            label: 'Apellidos',
            type: TipoInputType.TEXT,
          },
          {
            label: 'Edad',
            type: TipoInputType.NUMBER,
          },
          {
            label: 'Fecha de nacimiento',
            type: TipoInputType.DATE,
          },
          {
            label: 'Ciudad',
            type: TipoInputType.TEXT,
          },
          {
            label: 'Fecha de finalizacion',
            type: TipoInputType.DATE,
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
          },
          {
            label: 'Número de celular',
            type: TipoInputType.NUMBER,
          },
        ],
      },
    },

  ],
}

