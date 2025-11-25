import { Observable } from "rxjs";
import { ReportesDisponiblesResponse } from "../models/reportes-disponibles-response.model";

export abstract class ReportesDataSource {

  abstract getReportesDisponibles(): Observable<ReportesDisponiblesResponse>;

}
