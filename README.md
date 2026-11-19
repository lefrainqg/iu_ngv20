# iu_ngv20

Plantilla de interfaz con **Angular 20**, renderizado en servidor (SSR) y **PrimeNG**.
Incluye como ejemplo un componente de consulta de **malla curricular** que consume una API REST.

## Stack

- Angular 20 (componentes standalone, signals, `resource`)
- Angular SSR + Express
- PrimeNG 20
- Gestor de paquetes: pnpm

## Estructura

```
src/app/
├── components/   # Componentes (mcu-malla-curricular)
├── services/     # Servicios HTTP (plan de estudio)
└── shared/       # Endpoints y modelos
```

## Configuración

Define la URL de la API en `src/environments/environment.ts` (`PATH_API_CDA`).

## Desarrollo

```bash
pnpm install
pnpm start          # http://localhost:4200
```

## Build y SSR

```bash
pnpm build
pnpm serve:ssr:v20iu
```
