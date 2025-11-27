import { FormularioEventoRequest, TipoInputType } from "@features/evento/domain/models/formulario-evento-request.model";


export const formularioData: FormularioEventoRequest = {
  nombreEncuesta: '',
  fechaInicio: null,
  fechaFin: null,
  lista: [
    {
      typeFormulario: 'Información Personal',
      campos: {
        lista: [
          {
            label: 'Nombres',
            type: TipoInputType.TEXT,
            isRequired: true,
          },
          {
            label: 'Apellidos',
            type: TipoInputType.TEXT,
            isRequired: true,
          },
          {
            label: 'Edad',
            type: TipoInputType.NUMBER,
            isRequired: true,
          },
          {
            label: 'Fecha de nacimiento',
            type: TipoInputType.DATE,
            isRequired: true,
          },
          {
            label: 'Ciudad',
            type: TipoInputType.TEXT,
            isRequired: true,
          },
          {
            label: 'Fecha de finalizacion',
            type: TipoInputType.DATE,
            isRequired: true,
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
            isRequired: true,
          },
          {
            label: 'Número de celular',
            type: TipoInputType.NUMBER,
            isRequired: true,
          },
        ],
      },
    },
    {
      typeFormulario: 'Interés en Membresía',
      campos: {
        lista: [
          {
            label: '¿Estás interesad@ en una membresía?',
            type: TipoInputType.BOOLEAN,
            isRequired: true,
          },
        ],
      },
    },
    {
      campos: {
        lista: [
          {
            type: TipoInputType.BOOLEAN,
            label: 'Acepto que me contacten por Whatsapp y Correo Electronico',
            extras: 'Acepto términos y condiciones por la empresa Castillo de Chancay con la finalidad de recibir información, promociones, contenido educativo y beneficios relacionados con sus servicios, y autorizo el uso de mis datos de acuerdo a la Declaración de privacidad.',
            isRequired: true,
          }
        ]
      }
    }
  ],
}

