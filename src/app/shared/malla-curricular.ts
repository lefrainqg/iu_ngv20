
export type PlanEstudio = {
   pesId?: number;
   pesPao?: number;
   pesEstado?: boolean;
   pesModificacion?: boolean;
   pesUsuId?: number;
   pesFechaCreacion?: Date;
   CarreraFormacion?: CarreraFormacion;
   Asignatura?: Asignatura;
   Malla?: Malla;
}

export type Asignatura = {
   asiId?: number;
   asiNumero?: number;
   asiCodigo?: string;
   asiNombre?: string;
   asiCreditos?: number;
   asiHorasDocenciaContacto?: number;
   asiHorasDocenciaPractico?: number;
   asiHorasAprendizajeAutonomo?: number;
   asiHorasTotal?: number;
   asiHorasClaseSemana?: number;
   asiEstado?: boolean;
   asiModificacion?: boolean;
   asiUsuId?: number;
   asiFechaCreacion?: Date;
   Malla?: Malla;
   UnidadCurricular?: UnidadCurricular;
   NivelFormacion?: NivelFormacion;
}

export type Malla = {
   malId?: number;
   malNombre?: string;
   malResolucion?: string;
   malEstado?: boolean;
   malModificacion?: boolean;
   malUsuId?: number;
   malFechaCreacion?: Date;
   malCodigo?: string;
   malFechaInicio?: Date;
   malFechaFin?: Date;
}

export type UnidadCurricular = {
   ucuId?: number;
   ucuCodigo?: string;
   ucuNombre?: string;
   ucuOrden?: number;
   ucuEstado?: boolean;
   ucuModificacion?: boolean;
   ucuUsuId?: number;
   ucuFechaCreacion?: Date;
   totalAsignaturas?: number;
}

export type CarreraFormacion = {
   cfoId?: number;
   cfoUsuId?: number;
   cfoCodigo?: string;
   cfoNiveles?: number;
   cfoEstado?: boolean;
   cfoBaseDato?: string;
   cfoCodigoCes?: string;
   cfoFechaCreacion?: Date;
   cfoModificacion?: boolean;
   Carrera?: Carrera;
   NivelFormacion?: NivelFormacion;
}

export type Carrera = {
   carId?: number;
   carSexternoId?: number;
   carNombre?: string;
   carEstado?: boolean;
   carModificacion?: boolean;
   carUsuId?: number;
   carFechaCreacion?: Date;
   Facultad?: Facultad;
}

export type Facultad = {
   facId?: number;
   facSexternoId?: number;
   facCodigo?: string;
   facNombre?: string;
   facEstado?: boolean;
   facModificacion?: boolean;
   facUsuId?: number;
   facFechaCreacion?: Date;
}

export type NivelFormacion = {
   nfoId?: number;
   nfoNombre?: string;
   nfoEstado?: boolean;
   nfoModificacion?: boolean;
   nfoUsuId?: number;
   nfoFechaCreacion?: Date;
   nfoOrden?: number;
}

export type PlanEstudioArmonizacion = {
   parmId?: number;
   PlanEstudio?: PlanEstudio;
   CampoDetallado?: any;
   parmReferenciaId?: number;
   parmOrden?: number;
   parmEstado?: boolean;
   parmFechaRegistro?: Date;
}

export type Pao = {
   pesPao: number;
}

export type Requisito = {
   reqId?: number;
   reqPesId?: number;
   Requisito?: PlanEstudio;
   TipoRequisito?: TipoRequisito;
   reqEstado?: boolean;
   reqOrden?: number;
   reqUsuId?: number;
   reqFechareqacion?: Date;
}

export type TipoRequisito = {
   treqId?: number;
   treqCodigo?: string;
   treqNombre?: string;
   treqEstado?: boolean;
   treqFechaCreacion?: Date;
}

export type Modulo = {
   modId?: number;
   modCfoId?: number;
   modCodigo?: string;
   modNombre?: string;
   modFechaInicio?: Date;
   modFechaFin?: Date;
   modOrden?: number;
   modEstado?: boolean;
   modUsuId?: number;
   modFechaCreacion?: Date;
}

// Interfaces de academico
export type SaiMalla = {
   strCodigo?: string;
   strNombre?: string;
   dtFechaInic?: Date;
   dtFechaFin?: null;
   blnActivo?: boolean;
   idreglamento?: number;
   reg_nombre?: string;
   reg_fecha?: Date;
   reg_estado?: number;
}

export type SaiAsignatura = {
   strCodigo?: string;
   strNombre?: string;
   dtFechaCreada?: Date;
   dtFechaElim?: null;
   Fechainiciopensum?: Date;
   NombrePensum?: string;
   strCodTipo?: string;
   strCodPensum?: string;
   blnActiva?: boolean;
   strCodNivel?: string;
   strCodArea?: string;
   strCodFormaDict?: string;
   fltCreditos?: number;
   bytHorasTeo?: number;
   bytHorasPrac?: number;
   bytHorasAut?: number;
   strcodPadreIti?: null;
   bytHorasSeman?: number;

   // Posgrado
   PosModulo?: PosModulo;
}

export type InsArmonizacionAsignatura = {
   CampoAmplio?: InsCampoConocimiento;
   CampoEspecifico?: InsCampoConocimiento;
   CamposDetallados?: InsCampoConocimiento[];
}

export type InsCampoConocimiento = {
   strcodcarrera?: string;
   strcodpensum?: string;
   strcodasignatura?: string;
   strcodnivel?: string;
   idperfil?: number;
   txtdescripcionperfil?: string;
   codigoCampo?: number;
   tipoCampo?: string;
}

// TODO: Posgrado
export type PosgradoPlanEstudio = {
   Modulo?: PosModulo;
}

export type PosModulo = {
   modCodigo?: string;
   modNombre?: string;
   modFechaInicio?: Date;
   modFechaFin?: Date;
   lstAsignatura?: PosAsignatura[];
}

export type PosAsignatura = {
   asiCodigo?: string;
   asiNombre?: string;
   asiCreditos?: number;
   asiHoras?: number;
}

export type McuObservacion = {
   pobsId?: number;
   pobsPesId?: number; //Plan estudio
   pobsDescripcion?: string;
   pobsUsuId?: number;
   pobsFechaCreacion?: Date;
}


// Migracion SRL
export type McuMallaMigracionSrl = {
   Malla?: Malla;
   CarreraFormacion?: CarreraFormacion;
}
