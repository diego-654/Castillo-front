import { Observable } from "rxjs";
import { ReportesDisponiblesResponse } from "../models/reportes-disponibles-response.model";


export abstract class ReportesRepository {

  abstract getReportesDisponibles(): Observable<ReportesDisponiblesResponse>;

}
