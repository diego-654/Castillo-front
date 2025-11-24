


export interface ListarProximosCumpleaniosResponse {
  cumpleanios: Cumpleanio[];
}

export interface Cumpleanio {
  id: number;
  img: string;
  nombre: string;
  fecha: string;
}
