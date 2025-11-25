


import { Injectable } from "@angular/core";
import { MantenimientoDatasource } from "@features/mantenimiento/domain/datasources/mantenimiento.datasource";
import { ListarBeneficiosResponse } from "@features/mantenimiento/domain/models/listar-beneficios-response.model";
import { map, Observable, timer } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MantenimientoDatasourceImpl implements MantenimientoDatasource {

  listarBeneficios(): Observable<ListarBeneficiosResponse> {
    return timer(200).pipe(
      map((): ListarBeneficiosResponse => {
        return {
          beneficios: [
            {
              id: 1,
              idBeneficioGeneral: 1, // 👉 pertenece a “Beneficios”
              nombreBeneficio: 'Ingreso Libre (titular + beneficiarios)',
              membresia: [
                { id: 1, nombreMembresia: '1 vez al mes', valor: true },   // Medieval
                { id: 2, nombreMembresia: '1 vez al mes', valor: true },   // Real
                { id: 3, nombreMembresia: '1 vez al mes', valor: true },   // Medieval
                { id: 4, nombreMembresia: '1 vez al mes', valor: true },   // Real
              ],
            },
            {
              id: 2,
              idBeneficioGeneral: 1, // 👉 también al bloque 1
              nombreBeneficio: 'Ingreso libre para invitados',
              membresia: [
                { id: 1, nombreMembresia: '1 vez al mes', valor: true },   // Medieval
              ],
            },

            // 👇 Beneficios del bloque 2
            {
              id: 3,
              idBeneficioGeneral: 2, // 👉 pertenece a “Beneficios 2”
              nombreBeneficio: 'Descuento en tiendas',
              membresia: [
                { id: 1, nombreMembresia: '10% de descuento', valor: true }, // Medieval
              ],
            },
            {
              id: 4,
              idBeneficioGeneral: 1, // 👉 también al bloque 2
              nombreBeneficio: 'Ingreso Libre (titular + beneficiarios)',
              membresia: [
                { id: 1, nombreMembresia: '10% de descuento', valor: true }, // Medieval
              ],
            },
            {
              id: 5,
              idBeneficioGeneral: 1, // 👉 también al bloque 2
              nombreBeneficio: 'Piscina(Titular + beneficiarios)',
              membresia: [
                { id: 1, nombreMembresia: '10% de descuento', valor: true }, // Medieval
              ],
            },
          ],

          datosBeneficioMembresia: [
            {
              id: 1,
              nombreBeneficio: 'Beneficios',       // Bloque general 1
              tipoBeneficio: 'Parque Temático',
              datosMembresia: [
                { id: 1, nombreMembresia: 'Medieval', tipoMembresia: 'Membresía' },
                { id: 2, nombreMembresia: 'Real', tipoMembresia: 'Membresía' },
                { id: 3, nombreMembresia: 'Medieval', tipoMembresia: 'Membresía' },
                { id: 4, nombreMembresia: 'Real', tipoMembresia: 'Membresía' },
              ],
            },
            {
              id: 2,
              nombreBeneficio: 'Beneficios 2',     // Bloque general 2
              tipoBeneficio: 'Parque Temático',
              datosMembresia: [
                { id: 1, nombreMembresia: 'Medieval', tipoMembresia: 'Membresía' },
              ],
            }
          ],
        };
      })
    );
  }
}
