import { FormularioEventoRequest, TipoInputType } from "@features/evento/domain/models/formulario-cliente-request.model";


export const formularioData: FormularioEventoRequest = {
  id: 1,
  lista: [
    {
      typeFormulario: 'Información Personal',
      campos: {
        lista: [
          {
            nombre: 'Nombres',
            type: TipoInputType.TEXT,
          },
          {
            nombre: 'Apellidos',
            type: TipoInputType.TEXT,
          },
          {
            nombre: 'Edad',
            type: TipoInputType.NUMBER,
          },
          {
            nombre: 'Fecha de nacimiento',
            type: TipoInputType.DATE,
          },
          {
            nombre: 'Ciudad',
            type: TipoInputType.TEXT,
          },
          {
            nombre: 'Fecha de finalizacion',
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
            nombre: 'Correo electrónico',
            type: TipoInputType.TEXT,
          },
          {
            nombre: 'Número de celular',
            type: TipoInputType.NUMBER,
          },
        ],
      },
    },

  ],
}

