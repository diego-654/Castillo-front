


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
              nombreBeneficio: 'Ingreso Libre (titular + beneficiarios)',
              membresia: [
                {
                  id: 1,
                  nombreMembresia: '1 vez al mes',
                },
                {
                  id: 2,
                  nombreMembresia: '1 vez al mes',
                }
              ],
            },
            {
              id: 2,
              nombreBeneficio: 'Ingreso libre para invitados',
              membresia: [
                {
                  id: 1,
                  nombreMembresia: '1 vez al mes',
                }
              ],
            },
          ],
          datosBeneficioMembresia: [
            {
              id: 1,
              nombreBeneficio: 'Beneficios',
              tipoBeneficio: 'Parque Temático',
              datosMembresia: [
                {
                  id: 1,
                  nombreMembresia: 'Medieval',
                  tipoMembresia: 'Membresía',
                },
                {
                  id: 2,
                  nombreMembresia: 'Real',
                  tipoMembresia: 'Membresía',
                },
              ],
            },
            {
              id: 2,
              nombreBeneficio: 'Ingreso libre para invitados',
              tipoBeneficio: 'Parque Temático',
              datosMembresia: [
                {
                  id: 1,
                  nombreMembresia: 'Medieval',
                  tipoMembresia: 'Membresía',
                }
              ],
            }
          ],
        };
      })
    );
  }

}
