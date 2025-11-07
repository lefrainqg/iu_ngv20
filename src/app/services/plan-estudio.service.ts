import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { API_CDA_MALLA_CURRICULAR } from '../shared/apis'
import { CarreraFormacion, Malla, Pao, PlanEstudio } from '../shared/malla-curricular'

@Injectable({
   providedIn: 'root',
})
export class McuPlanEstudioService {

   private apiConfMallaCurricular: string = API_CDA_MALLA_CURRICULAR

   constructor(private http: HttpClient) { }

   getListByCarreraFormacionMalla(cfoId: number, malId: number): Observable<PlanEstudio[]> {
      return this.http.get<PlanEstudio[]>(`${this.apiConfMallaCurricular}/plan_estudio/carreraformacion_malla/${cfoId}/${malId}`)
   }

   getListByCarreraFormacionMallaAndPao(cfoId: number, malId: number, pao: number): Observable<PlanEstudio[]> {
      return this.http.get<PlanEstudio[]>(`${this.apiConfMallaCurricular}/plan_estudio/carreraformacion_malla_pao/${cfoId}/${malId}/${pao}`)
   }

   getListPaosByCarreraFormacionAndMalla(cfoId: number, malId: number): Observable<Pao[]> {
      return this.http.get<Pao[]>(`${this.apiConfMallaCurricular}/plan_estudio/list_paos/${cfoId}/${malId}`)
   }

   getListSinCargaByCarreraFormacion(prdId: number, cfoId: number, malId: number): Observable<Pao[]> {
      return this.http.get<Pao[]>(`${this.apiConfMallaCurricular}/plan_estudio/list_sincarga_carformacion/${prdId}/${cfoId}/${malId}`)
   }

   // cf
   getCfById(id: number): Observable<CarreraFormacion> {
      return this.http.get<CarreraFormacion>(`${this.apiConfMallaCurricular}/carrera_formacion/id/${id}`)
   }


   // malla
   getListMallasByCarreraFormacion(cfoId: number): Observable<Malla[]> {
      return this.http.get<Malla[]>(`${this.apiConfMallaCurricular}/malla/carrera_formacion/${cfoId}`)
   }


}
