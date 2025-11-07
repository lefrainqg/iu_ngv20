import { Component, input, output, signal, effect, inject, resource, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, delay, firstValueFrom, of, tap } from 'rxjs';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';

import { McuPlanEstudioService } from '../services/plan-estudio.service';
import { CarreraFormacion, Malla, Pao, PlanEstudio } from '../shared/malla-curricular';

@Component({
   standalone: true,
   selector: 'mcu-mallacurricular-modal',
   providers: [MessageService],
   imports: [
      CommonModule,
      FormsModule,
      ToastModule,
      TableModule,
      ButtonModule,
      DialogModule,
      SelectModule,
      InputTextModule,
   ],
   template: `
   <p-dialog [visible]="show()" [style]="{width: '65vw'}" [header]="'Malla curricular'" [maximizable]="true"
      [modal]="true" [resizable]="false" (visibleChange)="close()">
      <ng-template pTemplate="content">
         <div class="grid p-fluid">
            @if(cformacion(); as cfo) {
               <div class="col-12 grid m-0 p-0">
                  <div class="col-12">
                     <input type="text" pInputText [(ngModel)]="cfo!.Carrera!.carNombre" [disabled]="true" class="font-bold" />
                     <label for="nformacion" class="text-sm">Carrera</label>
                  </div>
                  @if(lstMalla().length > 0) {
                     <div class="col-12 md:col-10">
                        <p-select [options]="lstMalla()" [(ngModel)]="malla" inputId="titulo" (onChange)="changeMalla()" appendTo="body"
                           placeholder="Seleccione la malla">
                           <ng-template pTemplate="selectedItem">
                              {{malla()?.malCodigo}} - {{malla()?.malNombre}}
                              (
                              <span class="text-sm" [class]="malla()?.malEstado ? 'text-green-500' : 'text-blue-500'"> {{malla()?.malEstado ? 'activo' :
                                 'inactivo'}}</span> -
                              <span class="text-sm"> {{malla()?.malFechaCreacion | date:'yyyy-MM-dd' }}</span>
                              )
                           </ng-template>
                           <ng-template let-mal pTemplate="item">
                              {{mal()?.malCodigo}} - {{mal()?.malNombre}}
                              (
                              <span class="text-sm" [class]="mal()?.malEstado ? 'text-green-500' : 'text-blue-500'"> {{mal()?.malEstado ? 'activo' :
                                 'inactivo'}}</span> -
                              <span class="text-sm"> {{mal()?.malFechaCreacion | date:'yyyy-MM-dd' }}</span>
                              )
                           </ng-template>
                        </p-select>
                        <label for="malla" class="text-sm">Malla</label>
                     </div>
                     <div class="col-12 md:col-2">
                        <p-select inputId="pao" [options]="lstPao()" [(ngModel)]="pao" (onChange)="changePao()" optionLabel="pesPao"
                           placeholder="Selecciones el pao" appendTo="body" />
                        <label for="pao" class="text-sm">Pao</label>
                     </div>
                     <div class="field col-12">
                        <p-table #dt3 [value]="lstPlanEstudio()" [scrollable]="true" scrollHeight="350px" dataKey="pesId"
                           [globalFilterFields]="['Asignatura.asiCodigo','Asignatura.asiNombre']" [loading]="isLoading()" [rowHover]="true">
                           <ng-template pTemplate="header">
                              <tr>
                                 <th>Código</th>
                                 <th>Asignatura</th>
                                 <th class="text-center">Horas clase</th>
                                 <th class="text-center">Pao</th>
                                 <th style="width:15em">
                                    <input pInputText id="buscar" type="text" (input)="dt3.filterGlobal($any($event.target).value, 'contains')"
                                       placeholder="Buscar" />
                                 </th>
                              </tr>
                           </ng-template>
                           <ng-template pTemplate="body" let-pes>
                              <tr>
                                 <td>
                                    {{ pes.Asignatura.asiCodigo }} <br>
                                    <span class="text-sm">{{pes.Asignatura?.UnidadCurricular?.ucuNombre }}</span>
                                 </td>
                                 <td>
                                    <span class="font-semibold">{{ pes.Asignatura.asiNombre }}</span>
                                    <br>
                                    <span class="text-sm">
                                    </span>
                                 </td>
                                 <td class="text-center">{{ pes.Asignatura.asiHorasClaseSemana }}</td>
                                 <td class="text-center">
                                    <span>
                                       {{ pes.pesPao }}
                                    </span>
                                 </td>
                                 <td class="text-right">
                                    <p-button label="Asignar"  (click)="aceptar(pes)" [rounded]="true" severity="info" [style]="{width: '6em'}" />
                                 </td>
                              </tr>
                           </ng-template>
                        </p-table>
                     </div>
                  } @else {
                     <p>No existe mallas curriculares para la carrera</p>
                  }
               </div>
            } @else {
               <p>No se pudo obtener datos de la carrera</p>
            }
         </div>
      </ng-template>
   </p-dialog>

   <p-toast />

   `,
})
export class McuMallaCurricularModalComponent {
   show = input.required<boolean>();
   idcformacion = input.required<number>();
   onChangeAsignatura = output<any>();
   onHideMallaModal = output<boolean>();

   pao = signal<Pao | undefined>(undefined);
   malla = signal<Malla | undefined>(undefined);
   cformacion = signal<CarreraFormacion | undefined>(undefined);
   lstPao = signal<Pao[]>([]);
   lstMalla = signal<Malla[]>([]);
   lstPlanEstudio = signal<PlanEstudio[]>([]);
   isLoading = signal(false);

   private readonly wsMsg = inject(MessageService)
   private readonly wsPlanEstudio = inject(McuPlanEstudioService)

   constructor() {
      // 🧠 Efecto reactivo: al cambiar idcformacion, carga datos
      effect(() => {
         const id = this.idcformacion();
         if (!id) return;
         this.getCarreraFormacion(id)
      });
   }

   private getCarreraFormacion(id: number) {
      this.wsPlanEstudio.getCfById(id).subscribe({
         next: (res) => {
            if (!res) return;
            this.cformacion.set(res);
            this.getMallas();
         },
      });
   }

   private getMallas() {
      const cform = this.cformacion();
      if (!cform) return;
      this.wsPlanEstudio.getListMallasByCarreraFormacion(cform.cfoId!).subscribe({
         next: (lst) => {
            const activas = lst.filter((m) => m.malEstado);
            this.lstMalla.set(activas);
            this.malla.set(activas[0]);
            this.getPaos();
         },
      });
   }

   private getPaos() {
      const cform = this.cformacion();
      const malla = this.malla();
      if (!cform || !malla) return;

      this.wsPlanEstudio.getListPaosByCarreraFormacionAndMalla(cform.cfoId!, malla.malId!).subscribe({
         next: (lst) => {
            this.lstPao.set(lst);
            this.pao.set(lst[0]);
            this.getPlanEstudio();
         },
      });
   }

   private getPlanEstudio() {
      const cform = this.cformacion();
      const malla = this.malla();
      const pao = this.pao();

      if (!cform || !malla || !pao) return;

      this.isLoading.set(true);
      this.wsPlanEstudio
         .getListByCarreraFormacionMallaAndPao(cform.cfoId!, malla.malId!, pao.pesPao)
         .subscribe({
            next: (lst) => {
               this.isLoading.set(false);
               this.lstPlanEstudio.set(lst);
            },
            error: () => this.isLoading.set(false),
         });
   }

   changeMalla() {
      this.lstPao.set([]);
      this.lstPlanEstudio.set([]);
      this.getPaos();
   }

   changePao() {
      this.lstPlanEstudio.set([]);
      this.getPlanEstudio();
   }

   aceptar(pes: PlanEstudio) {
      this.onChangeAsignatura.emit(pes);
   }

   close = () => {
      this.onHideMallaModal.emit(false);
   }
}
