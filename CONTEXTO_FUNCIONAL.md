# CONTEXTO FUNCIONAL · DAS Concepción
## Sistema de Gestión Documental Web de Calidad

> Este documento explica **qué hace el sistema, qué pide la licitación pública que lo originó, y qué endpoints/funcionalidades cubren cada requisito**. Es la fuente de verdad sobre el **dominio del problema**.

---

## 1. ¿QUÉ ES ESTE SISTEMA?

Es un sistema web para que la **Dirección de Salud Municipal (DAS) de Concepción** gestione la calidad de la atención de salud en sus establecimientos:

- **3 CEMSCO** (Centros Especializados de Medicina y Cirugía Comunitaria)
- **4 CESFAM** (Centros de Salud Familiar)
- **Servicio Dental municipal**
- **Dirección DAS** central

El sistema sustenta el cumplimiento de las exigencias regulatorias chilenas sobre calidad en salud pública:

1. **Manual de Acreditación de la Superintendencia de Salud** (acreditación de prestadores institucionales de atención abierta)
2. **Normas Técnicas Básicas (NTB)** del MINSAL (autorización sanitaria de establecimientos)
3. **Sistema de notificación de Eventos Adversos** (seguridad del paciente)

## 2. ¿DE DÓNDE VIENE EL SISTEMA?

El sistema responde a la **Licitación Pública 2421-16-LE26**: *"Arriendo del Servicio del Sistema de Gestión Documental Web de Calidad para la DAS de Concepción"*.

La propuesta técnica fue presentada por **Awna Digital Spa** (firma: Daniel Abraham Isaías Cáceres Cerda) el **11 de mayo de 2026**.

El **Anexo N°3** del pliego define **46 ítems funcionales obligatorios** divididos en 5 secciones que la solución debe cumplir 100%. Cada ítem fue autoevaluado por el oferente como **"Cumple" (Sí)**, con compromiso de demostración online ante la comisión evaluadora.

## 3. USUARIOS DEL SISTEMA

| Rol | Quién es | Qué hace |
|---|---|---|
| **Administrador / Gestor de calidad** | Daniel Cáceres y otros encargados centrales | Configura el sistema, aprueba autoevaluaciones, gestiona usuarios, configura alarmas |
| **Jefe de servicio / unidad** | Directores de CEMSCO/CESFAM | Recibe notificaciones, aprueba documentos, supervisa cumplimiento |
| **Profesional clínico** | Enfermeras, dentistas, médicos, matronas, químicos farmacéuticos | Carga mediciones, aplica pautas, notifica eventos, ejecuta planes de mejora |
| **Notificador** | Cualquier funcionario | Notifica eventos adversos (incluso anónimamente) |
| **Autoridad** | Director DAS | Recibe informes consolidados de casos graves |

## 4. CONCEPTOS CLAVE DEL DOMINIO

Antes de tocar código, hay que entender este vocabulario. Si Claude no entiende estos términos, hará suposiciones erróneas.

### Acreditación

- **Pauta de evaluación**: documento oficial de la Superintendencia con los requisitos para ser acreditado.
- **Ámbito**: categoría grande del Manual (ej: Dignidad del paciente, Gestión de la calidad, Acceso, Registros clínicos, Seguridad del equipamiento). 5–8 ámbitos.
- **Característica**: requisito específico dentro de un ámbito. Puede ser **obligatoria** (debe cumplirse para acreditar) o **no obligatoria** (suma puntaje).
- **Elemento Medible (EM)**: indicador concreto y verificable dentro de una característica (ej: "EM 1.1.a: existe un procedimiento documentado"). Cada EM se autoevalúa como **Cumple / No cumple / No aplica**.
- **Punto de verificación**: evidencia concreta que demuestra el cumplimiento (ej: auditoría de 30 fichas).
- **Autoevaluación**: proceso de evaluar todos los EM de una pauta para una unidad y periodo. Genera un porcentaje de cumplimiento global.

### Indicadores

- **Indicador**: métrica numérica del desempeño (ej: IAAS-03 = Tasa de Infecciones Asociadas a Atención).
- **Numerador / Denominador**: el indicador se calcula como `(numerador / denominador) × 100`. Ej: (infecciones detectadas / atenciones totales).
- **Meta**: valor objetivo (ej: ≤ 3,0%).
- **Periodicidad**: mensual, trimestral, semestral, anual.
- **Medición**: dato concreto de un periodo. Incluye numerador, denominador, resultado, respaldo (PDF), responsable.
- **Documento de respaldo**: archivo PDF que justifica la medición.

### Documental

- **Documento institucional**: protocolo (POL-xxx), procedimiento (PRO-xxx), manual (MAN-xxx), formato (FOR-xxx).
- **Versionado**: cada modificación crea una nueva versión (v1.0, v1.1, v2.0…). Solo una versión está **vigente**.
- **Vigencia**: rango de fechas en que el documento es aplicable.
- **Vencimiento**: fecha en que el documento debe ser renovado.
- **Documento histórico**: versión antigua que se conserva pero se oculta a usuarios no-administradores.
- **Vista previa**: visualización del PDF dentro del sistema sin descargarlo.

### Pautas de supervisión

- **Pauta de supervisión (PSE-xxx)**: checklist de criterios para verificar un proceso en terreno.
- **Vinculación a indicadores**: cada pauta está conectada a uno o más indicadores que mide.
- **Aplicación de pauta**: cuando un supervisor recorre el área y va marcando cumple/no cumple en cada criterio.
- **Planificación**: agendar una pauta para una fecha futura.
- **Titular / Suplente**: responsable principal de aplicar la pauta + reemplazo.

### Eventos adversos

- **Evento adverso (EA-xxxx)**: incidente no deseado en la atención que causa o pudo causar daño al paciente.
- **Gravedad**: leve / moderado / grave / centinela.
- **Ámbito**: clínico, administrativo, infraestructura, equipamiento.
- **Tipo (TE-xxx)**: caída, error medicación, reacción adversa, identificación incorrecta, IAAS, etc.
- **Medida preventiva (MP-xxx)**: acción que ya existe en el sistema para prevenir ese tipo de evento.
- **Verificación**: confirmar que efectivamente es un evento sujeto a notificación + clasificarlo.
- **Causas detonantes**: análisis causa-raíz (factor humano, organizacional, estructural).
- **Plan de mejora (PM-xxxx)**: conjunto de actividades para evitar repetición del evento.
- **Actividad**: tarea concreta dentro de un plan de mejora.
- **Evidencia**: documento/foto que respalda que la actividad se ejecutó.
- **Resumen final**: informe ejecutivo del caso que se envía por email a jefaturas y autoridad.

### NTB (Autorización Sanitaria)

- **Norma Técnica Básica**: requisitos mínimos del MINSAL para que un establecimiento esté autorizado a funcionar.
- **Categorías**: Infraestructura física, Equipamiento médico, Recurso humano, etc.
- **Informe valorizado**: cuantifica en pesos chilenos la inversión necesaria para cerrar brechas detectadas.
- **Informe de evaluación**: resumen ejecutivo del estado de cumplimiento.
- **Historial de cambios**: registro de modificaciones físicas/de equipamiento en cada unidad.

### Otros

- **Tamaño muestral**: cálculo estadístico de cuántos elementos auditar para que la muestra sea representativa (fórmula con Z-score, margen de error, proporción).
- **Workspace / Mi día**: pantalla unificada donde el usuario carga indicadores y aplica pautas en una sola ventana (requisito 5.a).
- **Notificación rápida**: forma express de levantar un evento adverso (botón siempre visible).

## 5. LOS 46 ÍTEMS FUNCIONALES Y SUS ENDPOINTS

> Cada ítem del Anexo N°3 está mapeado a:
> - La **página** donde se cumple
> - El **endpoint del backend** que lo soporta
> - El **service** del frontend que lo llama

### SECCIÓN 1 · ACREDITACIÓN DE PRESTADORES (14 ítems)

#### 1.1 Pauta de Evaluación del Manual de Acreditación

| # | Requisito | Página | Endpoint | Service |
|---|---|---|---|---|
| 1.1.a | Autoevaluación en cumple/no cumple/no aplica para cada EM | `/autoevaluacion` | `POST /api/acreditacion/pautas/:id/autoevaluacion`, `PUT /api/acreditacion/autoevaluaciones/:id` | `Acreditacion.js` |
| 1.1.b | Visualización de documentos vigentes/anteriores e indicadores vigentes/no vigentes | `/documental`, `/acreditacion` | `GET /api/documents`, `GET /api/indicators` | `Documents.js`, `Indicators.js` |

#### 1.2 Gestión de Indicadores de Acreditación

| # | Requisito | Página | Endpoint | Service |
|---|---|---|---|---|
| 1.2.a | Creación de indicadores y cálculo del % de cumplimiento por característica | `/acreditacion`, `/indicadores/:id` | `POST /api/indicators`, `GET /api/indicators/:id/chart` | `Indicators.js` |
| 1.2.b | Usuarios cargan y modifican mediciones | `/indicadores/:id` | `POST /api/indicators/:id/measurements`, `PUT /api/indicators/:id/measurements/:measurementId` | `Indicators.js` |
| 1.2.c | Asignación de servicios/áreas/unidades responsables | `/indicadores/:id` | `POST /api/indicators/:id/assign` | `Indicators.js` |
| 1.2.d | Carga de documentos con vista previa y descarga PDF | `/documental` (Modal vista previa) | `GET /api/documents/:id/preview`, `GET /api/documents/:id/download` | `Documents.js` |
| 1.2.e | **Alarma email por retraso en ingreso de datos** | `/configuracion` (tab Notificaciones) | `POST /api/acreditacion/alarmas/configurar`, `POST /api/notifications/preferences` | `Notifications.js` |
| 1.2.f | Monitoreo agrupado por ámbitos del Manual | `/acreditacion` | `GET /api/acreditacion/monitoreo`, `GET /api/acreditacion/ambitos` | `Acreditacion.js` |
| 1.2.g | Informes asociados a planes de mejora | `/reportes`, `/plan-mejora/:id` | `GET /api/reports/acreditacion/pdf`, `GET /api/improvement-plans/:id` | `Reports.js`, `ImprovementPlans.js` |
| 1.2.h | Gráficos históricos con pautas que generaron mediciones | `/indicadores/:id` | `GET /api/indicators/:id/history`, `GET /api/indicators/:id/chart` | `Indicators.js` |

#### 1.3 Monitoreo de Indicadores

| # | Requisito | Página | Endpoint | Service |
|---|---|---|---|---|
| 1.3.a | Monitoreo de características obligatorias y no obligatorias | `/autoevaluacion` | `GET /api/acreditacion/monitoreo/obligatorias`, `GET /api/acreditacion/monitoreo/no-obligatorias` | `Acreditacion.js` |
| 1.3.b | Visualización por servicio/área/unidad responsable | `/acreditacion`, `/organizacion` | `GET /api/indicators/by-unidad/:unidadId`, `GET /api/indicators/by-ambito/:ambitoId` | `Indicators.js` |
| 1.3.c | Monitoreo agrupado por servicio/área/unidad | `/acreditacion` | `GET /api/acreditacion/consolidado` | `Acreditacion.js` |
| 1.3.d | **Comparativa entre periodos** | `/comparativa` | `GET /api/acreditacion/comparar` | `Acreditacion.js` |

### SECCIÓN 2 · AUTORIZACIÓN SANITARIA (4 ítems)

| # | Requisito | Página | Endpoint | Service |
|---|---|---|---|---|
| 2.a | Pauta de evaluación NTB | `/autorizacion-sanitaria` | `GET /api/ntb/pautas`, `POST /api/ntb/evaluaciones` | `Ntb.js` |
| 2.b | Informe valorizado de inversión requerida | `/autorizacion-sanitaria` (tab 2) | `GET /api/ntb/evaluaciones/:id/informe-valorizado` | `Ntb.js` |
| 2.c | Informe de evaluación | `/autorizacion-sanitaria` (tab 3) | `GET /api/ntb/evaluaciones/:id/informe-evaluacion` | `Ntb.js` |
| 2.d | Historial de cambios realizados por unidad | `/autorizacion-sanitaria` (tab 4) | `GET /api/ntb/historial/unidad/:unidadId`, `GET /api/ntb/historial/:id/cambios` | `Ntb.js` |

### SECCIÓN 3 · GESTIÓN DE CALIDAD (12 ítems)

#### 3.1 Sistema de Gestión Documental

| # | Requisito | Página | Endpoint | Service |
|---|---|---|---|---|
| 3.1.a | Manejo de documentación por versiones con registro de cambios | `/documental` | `POST /api/documents/:id/versions`, `GET /api/documents/:id/versions` | `Documents.js` |
| 3.1.b | **Selección de versión por periodo evaluado** | `/documental` (Modal versiones) | `GET /api/documents/:id/version-by-period` | `Documents.js` |
| 3.1.c | Alarma email cuando un documento está por vencer | `/configuracion` (Notificaciones) | `GET /api/documents/expiring`, `POST /api/notifications/preferences` | `Documents.js`, `Notifications.js` |
| 3.1.d | Documentos históricos disponibles pero no visibles a no-administradores | `/documental` (tab Archivados) | `GET /api/documents/historicos` (adminOnly) | `Documents.js` |
| 3.1.e | **Ubicación del documento en varias vistas** | `/documental` (filtros) | `GET /api/documents?categoria=&servicio=` | `Documents.js` |

#### 3.2 Pautas de Supervisión

| # | Requisito | Página | Endpoint | Service |
|---|---|---|---|---|
| 3.2.a | Crear pautas vinculadas a indicadores | `/supervision` | `POST /api/supervision` | `Supervision.js` |
| 3.2.b | **Planificación con aviso email el día programado** | `/supervision` (Modal Programar) | `POST /api/supervision/:id/planificar`, `POST /api/notifications/preferences` | `Supervision.js`, `Notifications.js` |
| 3.2.c | Asignación de responsables/suplentes, cambio de vigencia | `/supervision` | `POST /api/supervision/:id/responsables`, `PUT /api/supervision/:id/vigencia` | `Supervision.js` |
| 3.2.d | Informe consolidado de pautas aplicadas | `/reportes` | `GET /api/supervision/consolidado` | `Supervision.js` |
| 3.2.e | Herramienta de búsqueda de pautas | `/busqueda`, `/supervision` | `GET /api/supervision/search` | `Supervision.js`, `Search.js` |
| 3.2.f | Monitoreo de cumplimiento de pautas | `/supervision` | `GET /api/supervision/cumplimiento` | `Supervision.js` |
| 3.2.g | Gráfica de cumplimiento de criterios en indicadores vinculados | `/indicadores/:id` | `GET /api/supervision/:id/grafica-indicadores` | `Supervision.js` |

### SECCIÓN 4 · EVENTOS ADVERSOS (11 ítems)

#### 4.1 Administración de Eventos Adversos

| # | Requisito | Página | Endpoint | Service |
|---|---|---|---|---|
| 4.1.a | Asignación de responsables de gestión de eventos | `/catalogos-eventos` (tab Asignaciones) | `POST /api/events/responsables/asignar` | `Events.js` |
| 4.1.b | Notificación email al responsable de gestión | `/configuracion`, automático al notificar | `POST /api/events/notify` (dispara email) | `Events.js`, `Notifications.js` |
| 4.1.c | Estructura: categorización, ámbitos, eventos por ámbito, medidas preventivas | `/catalogos-eventos` | `GET /api/events/catalogos/ambitos`, `GET /api/events/catalogos/tipos`, `GET /api/events/catalogos/medidas` | `Events.js` |
| 4.1.d | **Definición de formularios de notificación** | `/formularios-eventos` | `GET /api/events/formularios`, `POST /api/events/formularios` | `Events.js` |
| 4.1.e | **Asignación de usuarios por servicio para notificación** | `/catalogos-eventos` (tab Asignaciones) | `POST /api/events/notificadores/asignar` | `Events.js` |
| 4.1.f | Ingreso de ámbitos, eventos y medidas preventivas | `/catalogos-eventos` | `POST /api/events/catalogos/ambitos`, `POST /api/events/catalogos/tipos`, `POST /api/events/catalogos/medidas` | `Events.js` |

#### 4.2 Seguimiento de Eventos Adversos

| # | Requisito | Página | Endpoint | Service |
|---|---|---|---|---|
| 4.2.a | Verificación + clasificación + envío automático a jefe y autoridad | `/eventos/:id` (timeline) | `POST /api/events/:id/verify`, dispara emails automáticos | `Events.js` |
| 4.2.b | Gestión: medidas preventivas + causas + plan de mejora + resumen email | `/eventos/:id` | `PUT /api/events/:id/manage`, `POST /api/events/:id/send-summary` | `Events.js` |
| 4.2.c | Evaluación del Plan: actividades + evidencias | `/plan-mejora/:id` | `POST /api/improvement-plans/:id/actividades`, `POST /api/improvement-plans/:id/actividades/:actividadId/evidencia` | `ImprovementPlans.js` |
| 4.2.d | Seguimiento del avance del plan | `/plan-mejora/:id` | `GET /api/improvement-plans/:id/avance`, `PUT /api/improvement-plans/:id/actividades/:actividadId` | `ImprovementPlans.js` |
| 4.2.e | Estadísticas de eventos notificados | `/eventos`, `/reportes` | `GET /api/events/estadisticas`, `GET /api/reports/eventos/pdf` | `Events.js`, `Reports.js` |

### SECCIÓN 5 · OTRAS HERRAMIENTAS (5 ítems)

| # | Requisito | Página | Endpoint | Service |
|---|---|---|---|---|
| 5.a | **Indicadores + pautas planificadas en una sola ventana** | `/mi-dia` (Workspace) | `GET /api/workspace/pendientes`, `POST /api/workspace/indicadores-y-pautas` | `Workspace.js` |
| 5.b | Búsqueda documental con identificación de por vencer/vencidos | `/busqueda`, `/documental` | `GET /api/workspace/search/documents`, `GET /api/documents/expiring`, `GET /api/documents/expired` | `Search.js`, `Documents.js` |
| 5.c | Cálculo del tamaño muestral | `/calculo-muestral` | `GET /api/workspace/sample-size` (o cálculo en frontend) | `Workspace.js` |
| 5.d | Información para gestión: medición + periodos + respaldos | `/dashboard`, `/reportes` | `GET /api/workspace/dashboard/kpis`, `GET /api/workspace/dashboard/mediciones-consolidadas`, `GET /api/workspace/dashboard/respaldos` | `Workspace.js`, `Dashboard.js` |
| 5.e | Notificación rápida de evento adverso (formulario + envío email) | Botón en topbar (varias páginas) | `POST /api/events/notify` | `Events.js` |

## 6. PÁGINAS DEL SISTEMA Y QUÉ HACE CADA UNA

### Login (`/login`) — pública

Acceso al sistema con email + contraseña. Si éxito → guarda `{ token, user }` en `localStorage` y redirige a `/dashboard`. Manda `{mail, password}` al backend (⚠️ el backend espera `{email, password}` — pendiente de arreglar).

### Dashboard (`/dashboard`)

Pantalla principal con resumen ejecutivo del usuario logueado:

- KPIs grandes: documentos vigentes, indicadores cumpliendo, eventos abiertos, planes activos
- Tareas pendientes ordenadas por urgencia (vencido > hoy > esta semana)
- Cumplimiento por ámbito (barras horizontales)
- Actividad reciente del sistema (audit log filtrado)
- Botones rápidos: notificar evento adverso, ver notificaciones

### Mi día / Workspace (`/mi-dia`)

**Cumple el ítem 5.a (ventana unificada).** Permite cargar mediciones de indicadores **y** aplicar pautas de supervisión en la misma pantalla. Útil para usuarios operativos que quieren resolver todas sus tareas del día sin saltar entre módulos.

### Acreditación (`/acreditacion`)

Listado de los indicadores de acreditación del Manual de la Superintendencia. Filtros por ámbito, estado, responsable. Acceso a:

- `/indicadores/:id` — detalle del indicador con carga de mediciones
- `/autoevaluacion` — proceso de autoevaluar la pauta del Manual
- `/comparativa` — comparar dos periodos

### Indicador-detalle (`/indicadores/:id`)

Detalle completo de un indicador: gráfico histórico, configuración (meta, responsable, periodicidad), formulario para cargar nueva medición con cálculo automático, historial de mediciones anteriores con respaldos PDF.

### Autoevaluación (`/autoevaluacion`)

Pantalla para recorrer los Elementos Medibles (EM) de la pauta del Manual y marcar **Cumple / No cumple / No aplica** en cada uno, con justificación y evidencias adjuntas. Agrupada por ámbitos colapsables.

### Comparativa (`/comparativa`)

Cumple el ítem 1.3.d. Compara el cumplimiento global entre dos periodos (ej: Q1 2026 vs Q2 2026), muestra variación por ámbito, mejoras destacadas y deterioros.

### Autorización Sanitaria (`/autorizacion-sanitaria`)

Cumple toda la sección 2. Cuatro tabs:

1. **Evaluación**: categorías (Infraestructura, Equipamiento, etc.) con sus requisitos marcados como cumple/no cumple/N/A y costo asociado a cerrar la brecha.
2. **Informe valorizado**: cuantificación económica de las brechas.
3. **Informe de evaluación**: resumen ejecutivo.
4. **Historial de cambios**: cambios físicos/de equipamiento por unidad.

### Documental (`/documental`)

Cumple la sección 3.1. Tabla de documentos con tabs (Vigentes, Por vencer, Vencidos, Archivados, Por aprobar). Acciones por documento:

- Vista previa del PDF (Modal)
- Selector de versión por periodo (Modal) — **cumple 3.1.b**
- Descarga
- Detalle

### Supervisión (`/supervision`)

Cumple la sección 3.2. Listado de pautas con KPIs (vigentes, aplicadas, programadas, cumplimiento promedio). Formulario lateral para aplicar una pauta (criterios con cumple/no cumple). Modal "Programar pauta" para planificación con aviso email — **cumple 3.2.b**.

### Eventos (`/eventos`)

Cumple la sección 4.1. Formulario lateral de notificación rápida + listado de eventos recientes con gravedad. Acciones rápidas a catálogos y formularios. Cada evento es clickeable hacia su detalle.

### Evento-detalle (`/eventos/:id`)

Cumple la sección 4.2. Cinco tabs:

1. **Verificación**: confirmar si es evento sujeto a notificación
2. **Análisis y gestión**: causas detonantes + medidas preventivas + otros casos similares
3. **Plan de mejora**: link a creación del plan
4. **Seguimiento**: avance
5. **Estadísticas**: del caso particular

Lateralmente, **timeline del caso** con cada paso (notificación, email automático, verificación, etc.).

### Plan-mejora (`/plan-mejora/:id`)

Cumple los ítems 4.2.c y 4.2.d. Avance global del plan con barras + listado de actividades (cada una con su estado, evidencias adjuntas, responsable, plazo).

### Catálogos-eventos (`/catalogos-eventos`)

Configuración de la estructura del módulo de eventos. Cuatro tabs:

1. **Ámbitos** (clínico, administrativo…)
2. **Tipos de eventos** (caída, error medicación…)
3. **Medidas preventivas**
4. **Asignaciones** (qué usuarios notifican qué servicios — **cumple 4.1.e**)

### Formularios-eventos (`/formularios-eventos`)

**Cumple 4.1.d.** Definición de los formularios de notificación. Cada formulario tiene campos editables (label, key, tipo, obligatorio).

### Búsqueda (`/busqueda`)

Buscador global que cruza documentos, indicadores, pautas y eventos. Soporta resaltado (`<mark>`) de coincidencias y filtros por tipo.

### Cálculo muestral (`/calculo-muestral`)

Calculadora estadística. Inputs: población N, nivel de confianza (80/90/95/99%), margen de error (3/5/7/10%), proporción p (default 0.5). Aplica la fórmula `n = (Z²·p·(1-p)·N) / (e²·(N-1) + Z²·p·(1-p))`.

### Reportes (`/reportes`)

Generación de reportes PDF/Excel de cada módulo. Listado de reportes generados recientemente para re-descargar.

### Usuarios (`/usuarios`)

Administración de usuarios del sistema. KPIs + tabla con nombre, email, RUT, cargo, servicio, perfil (admin/usuario).

### Organización (`/organizacion`)

Estructura jerárquica de la DAS: árbol expandible (DAS → CEMSCO/CESFAM → unidades). Al seleccionar una unidad, muestra detalle (director, dirección, personal asignado, indicadores del mes).

### Configuración (`/configuracion`)

**Centraliza la configuración del sistema.** Cinco tabs:

1. **Notificaciones por email** — toggles para activar/desactivar cada alarma email. Cubre los ítems 1.2.e (alarma retraso indicador), 3.1.c (vencimiento documento), 3.2.b (pauta planificada), 4.1.b (notificación evento adverso).
2. **Alarmas automáticas** — configurar umbrales y plazos.
3. **Periodos de evaluación** — definir trimestres y anuales.
4. **Plantillas de email** — personalizar el contenido de los emails automáticos.
5. **Integraciones externas** — Superintendencia, Servicio de Salud, SSO, RAYEN.

### Auditoría (`/auditoria`)

Registro de todas las acciones del sistema. Cada log incluye: fecha+hora, usuario, acción (Crear/Editar/Eliminar/Aprobar/Acceder), entidad afectada con ID, IP de origen, estado (exitoso/error).

## 7. CATÁLOGO COMPLETO DE ENDPOINTS DEL BACKEND

> El backend (Node.js + Express + MongoDB + JWT) expone esta API REST. Todos los endpoints (excepto `/api/auth/login`) requieren header `Authorization: Bearer <token>`.

### Autenticación

```
POST   /api/auth/login          { email, password } → { token, user }
POST   /api/auth/logout
GET    /api/auth/me
POST   /api/auth/refresh
```

### Usuarios

```
GET    /api/users
POST   /api/users               (adminOnly)
GET    /api/users/:id
PUT    /api/users/:id           (adminOnly)
DELETE /api/users/:id           (adminOnly, deactivate)
PUT    /api/users/:id/role      (adminOnly)
```

### Organizaciones (estructura DAS → CEMSCO/CESFAM)

```
GET    /api/organizations
POST   /api/organizations       (adminOnly)
PUT    /api/organizations/:id   (adminOnly)
DELETE /api/organizations/:id   (adminOnly)
GET    /api/organizations/:id/members
POST   /api/organizations/:id/assign-user   (adminOnly)
```

### Indicadores

```
GET    /api/indicators
POST   /api/indicators
GET    /api/indicators/by-ambito/:ambitoId
GET    /api/indicators/by-unidad/:unidadId
GET    /api/indicators/:id
PUT    /api/indicators/:id
DELETE /api/indicators/:id
POST   /api/indicators/:id/measurements              ← cargar medición
GET    /api/indicators/:id/measurements              ← historial
PUT    /api/indicators/:id/measurements/:measurementId
GET    /api/indicators/:id/history                   ← histórico para gráfico
GET    /api/indicators/:id/chart                     ← datos del gráfico
POST   /api/indicators/:id/assign                    ← asignar responsable
```

### Acreditación

```
GET    /api/acreditacion/pautas
POST   /api/acreditacion/pautas
GET    /api/acreditacion/pautas/:id
PUT    /api/acreditacion/pautas/:id
GET    /api/acreditacion/pautas/:id/caracteristicas
POST   /api/acreditacion/pautas/:id/autoevaluacion   ← iniciar autoeval
PUT    /api/acreditacion/autoevaluaciones/:id        ← actualizar cada EM
GET    /api/acreditacion/autoevaluaciones/:id
GET    /api/acreditacion/ambitos
GET    /api/acreditacion/monitoreo
GET    /api/acreditacion/monitoreo/obligatorias
GET    /api/acreditacion/monitoreo/no-obligatorias
GET    /api/acreditacion/consolidado
GET    /api/acreditacion/comparar?periodA=&periodB=  ← comparativa
POST   /api/acreditacion/alarmas/configurar
```

### NTB (Autorización Sanitaria)

```
GET    /api/ntb/pautas
POST   /api/ntb/pautas
GET    /api/ntb/pautas/:id
POST   /api/ntb/evaluaciones
GET    /api/ntb/evaluaciones/:id
PUT    /api/ntb/evaluaciones/:id
POST   /api/ntb/evaluaciones/:id/finalizar
GET    /api/ntb/evaluaciones/:id/informe-valorizado
GET    /api/ntb/evaluaciones/:id/informe-evaluacion
GET    /api/ntb/historial/unidad/:unidadId
GET    /api/ntb/historial/:id/cambios
```

### Documentos

```
GET    /api/documents
POST   /api/documents
GET    /api/documents/expiring                       ← por vencer
GET    /api/documents/expired                        ← vencidos
GET    /api/documents/categorias
GET    /api/documents/historicos                     (adminOnly)
GET    /api/documents/:id
PUT    /api/documents/:id
DELETE /api/documents/:id
GET    /api/documents/:id/preview                    ← vista previa
GET    /api/documents/:id/download                   ← descarga PDF
POST   /api/documents/:id/versions                   ← nueva versión
GET    /api/documents/:id/versions                   ← listar versiones
GET    /api/documents/:id/versions/:versionId
GET    /api/documents/:id/version-by-period?period=  ← versión por periodo
```

### Pautas de supervisión

```
GET    /api/supervision
POST   /api/supervision
GET    /api/supervision/search?q=
GET    /api/supervision/consolidado
GET    /api/supervision/cumplimiento
GET    /api/supervision/:id
PUT    /api/supervision/:id
PUT    /api/supervision/:id/vigencia
POST   /api/supervision/:id/responsables             ← titular y suplente
POST   /api/supervision/:id/planificar               ← planificación c/email
POST   /api/supervision/:id/apply                    ← aplicar pauta
GET    /api/supervision/:id/aplicaciones
GET    /api/supervision/:id/grafica-indicadores
```

### Eventos adversos

```
GET    /api/events                                   ← listado
POST   /api/events/notify                            ← notificación rápida
GET    /api/events/:id
POST   /api/events/:id/verify                        ← verificación + clasif
PUT    /api/events/:id/manage                        ← gestión (causas, etc)
POST   /api/events/:id/send-summary                  ← email resumen final
GET    /api/events/estadisticas

— Catálogos —
GET    /api/events/catalogos/ambitos
POST   /api/events/catalogos/ambitos                 (adminOnly)
PUT    /api/events/catalogos/ambitos/:id             (adminOnly)
DELETE /api/events/catalogos/ambitos/:id             (adminOnly)
GET    /api/events/catalogos/tipos
POST   /api/events/catalogos/tipos                   (adminOnly)
GET    /api/events/catalogos/medidas
POST   /api/events/catalogos/medidas                 (adminOnly)

— Formularios —
GET    /api/events/formularios
POST   /api/events/formularios                       (adminOnly)
PUT    /api/events/formularios/:id                   (adminOnly)

— Asignaciones —
GET    /api/events/responsables
POST   /api/events/responsables/asignar              (adminOnly)
POST   /api/events/notificadores/asignar             (adminOnly)
```

### Planes de mejora

```
GET    /api/improvement-plans
POST   /api/improvement-plans
GET    /api/improvement-plans/by-event/:eventId
GET    /api/improvement-plans/:id
GET    /api/improvement-plans/:id/avance
POST   /api/improvement-plans/:id/actividades
PUT    /api/improvement-plans/:id/actividades/:actividadId
POST   /api/improvement-plans/:id/actividades/:actividadId/evidencia  (multipart)
```

### Workspace (Mi día) + búsqueda + sample size + KPIs

```
GET    /api/workspace/pendientes                     ← tareas del usuario
POST   /api/workspace/indicadores-y-pautas           ← ítem 5.a (carga unificada)
GET    /api/workspace/search?q=                      ← búsqueda global
GET    /api/workspace/search/documents?q=
GET    /api/workspace/sample-size?N=&conf=&err=&p=
GET    /api/workspace/dashboard/kpis
GET    /api/workspace/dashboard/mediciones-consolidadas
GET    /api/workspace/dashboard/respaldos
```

### Notificaciones

```
GET    /api/notifications
PUT    /api/notifications/:id/read
GET    /api/notifications/unread-count
POST   /api/notifications/preferences                ← configurar alarmas
GET    /api/notifications/email-templates
PUT    /api/notifications/email-templates/:id        (adminOnly)
```

### Reportes

```
GET    /api/reports/acreditacion/pdf?periodo=
GET    /api/reports/eventos/pdf?periodo=
GET    /api/reports/ntb/pdf?unidadId=
GET    /api/reports/documental/pdf?estado=
POST   /api/reports/custom                           ← reporte personalizado
```

### Auditoría

```
GET    /api/audit
GET    /api/audit/by-user/:userId
GET    /api/audit/by-entity/:entityType/:entityId
GET    /api/audit/by-unidad/:unidadId
GET    /api/audit/export
```

## 8. FLUJOS DE NEGOCIO CRÍTICOS

### Flujo 1: Notificar un evento adverso (cumple 4.1.b, 4.2.a)

1. Usuario hace click en "Notificar evento" desde topbar
2. Llena formulario rápido: fecha, ámbito, tipo, servicio, descripción, evidencias
3. Frontend: `Events.notify(data)` → `POST /api/events/notify`
4. Backend:
   - Crea registro del evento con estado "Sin verificar"
   - Identifica al gestor de eventos del servicio donde ocurrió
   - **Dispara email automático** al gestor con link al detalle
   - Si es gravedad alta, **email adicional** al jefe del servicio y a la autoridad del establecimiento
   - Registra en audit log
5. Frontend: toast "Evento notificado" + invalidación de queries para refrescar listado

### Flujo 2: Cargar medición de indicador con respaldo (cumple 1.2.b, 1.2.d)

1. Usuario va a `/indicadores/IAAS-03`
2. Ve histórico y formulario de carga (numerador / denominador / fecha / respaldo PDF)
3. Al escribir numerador/denominador, frontend **calcula automáticamente** `(num/den)*100`
4. Compara contra meta del indicador (`≤ 3,0%`) → badge automático cumple/no cumple
5. Adjunta PDF de respaldo
6. Submit: `Indicators.addMeasurement(id, data)` → `POST /api/indicators/:id/measurements` (multipart)
7. Backend:
   - Sube PDF a storage
   - Crea registro de medición vinculado al indicador
   - Actualiza el % de cumplimiento global
   - Registra en audit log
8. Frontend: invalida queries y muestra la nueva medición en el historial

### Flujo 3: Aplicar autoevaluación de la pauta del Manual (cumple 1.1.a)

1. Usuario va a `/autoevaluacion`
2. Frontend: `POST /api/acreditacion/pautas/:id/autoevaluacion` → crea autoeval en estado borrador
3. Para cada EM, usuario marca cumple/no cumple/no aplica + justificación
4. Cada cambio: `PUT /api/acreditacion/autoevaluaciones/:id` (actualiza el EM específico)
5. Cuando termina: presiona "Finalizar"
6. Backend calcula % cumplimiento global por ámbito y total, cambia estado a "Finalizada"
7. Documento queda disponible para `GET /api/acreditacion/comparar` en periodos futuros

### Flujo 4: Programar pauta con aviso email (cumple 3.2.b)

1. Usuario en `/supervision` abre Modal "Programar pauta"
2. Define: pauta, fecha, hora, responsable titular, suplente, frecuencia (única/mensual/trimestral)
3. Activa toggles: "Enviar email el día programado" y "Recordatorio 24h antes"
4. Submit: `Supervision.programar(pautaId, data)` → `POST /api/supervision/:id/planificar`
5. Backend:
   - Crea programación en la BD
   - Agenda jobs (cron) para:
     - 24h antes: email recordatorio al titular y suplente
     - El día mismo: email "es hoy que debes aplicar X"
   - Si la frecuencia es recurrente, agenda las próximas ejecuciones

### Flujo 5: Gestionar evento adverso → crear plan de mejora (cumple 4.2.b, 4.2.c)

1. Usuario abre `/eventos/EA-2026-0042`
2. Tab "Verificación": confirma que es evento + clasifica (`POST /api/events/:id/verify`)
3. Tab "Análisis y gestión":
   - Agrega causas detonantes
   - Marca qué medidas preventivas existentes son aplicables
   - Describe otros pacientes en igual situación
   - Escribe resumen final
   - Submit: `PUT /api/events/:id/manage`
4. Envía resumen por email a jefaturas: `POST /api/events/:id/send-summary`
5. Click "Crear plan de mejora" → `POST /api/improvement-plans` con `eventoId`
6. Va a `/plan-mejora/PM-2026-0028`
7. Agrega actividades: `POST /api/improvement-plans/:id/actividades`
8. Por cada actividad ejecutada, sube evidencia: `POST /.../actividades/:actividadId/evidencia` (multipart)
9. Sistema actualiza % de avance automático

### Flujo 6: Workspace unificado (cumple 5.a)

1. Usuario va a `/mi-dia`
2. Frontend: `GET /api/workspace/pendientes` → recibe lista priorizada de indicadores a cargar + pautas a aplicar
3. Selecciona "IAAS-03 (indicador) + PSE-009 (pauta vinculada)"
4. En la **misma pantalla** carga la medición Y aplica los criterios de la pauta
5. Submit único: `POST /api/workspace/indicadores-y-pautas`
6. Backend transaccional: crea medición + aplicación de pauta + actualiza gráficos vinculados + registra audit
7. Frontend: toast éxito + redirige al dashboard

## 9. ENTIDADES PRINCIPALES (modelo de datos)

Resumen de las entidades clave para que Claude entienda relaciones:

```
Usuario ──┬── Organizacion (servicio asignado)
          ├── Perfil (admin / usuario)
          └── RolesPorUnidad (responsable de…)

Organizacion (DAS / CEMSCO / CESFAM / unidades)
   └── tiene jerarquía padre-hijo

Indicador (IAAS-03, DIG-01, ...)
   ├── Ambito (Seguridad paciente, Dignidad, …)
   ├── Caracteristica (del Manual)
   ├── Responsable (Usuario)
   ├── Unidad (Organizacion)
   ├── Meta, Periodicidad, Obligatorio
   └── Mediciones[] (numerador, denominador, fecha, respaldo PDF)

PautaAcreditacion (Manual Superintendencia)
   ├── Ambitos[]
   │   └── Caracteristicas[]
   │       └── ElementosMedibles[]  (con punto de verificación)
   └── Autoevaluaciones[] (por unidad + periodo)
        └── EvaluacionEM[] (cumple/no cumple/no aplica + justificación + evidencias)

Documento
   ├── Codigo (POL-018, PRO-042…)
   ├── Tipo (Protocolo, Procedimiento, Manual, Formato)
   ├── Categoria (libre)
   ├── ServicioAplicable
   ├── Versiones[] (cada una con vigencia, fechaCreacion, archivo PDF)
   ├── VersionActual
   └── FechaVencimiento

PautaSupervision (PSE-xxx)
   ├── Codigo
   ├── IndicadoresVinculados[]
   ├── Criterios[] (preguntas con cumple/no cumple)
   ├── Titular, Suplente
   ├── Vigencia
   ├── Frecuencia
   ├── Planificaciones[] (fecha, hora, frecuencia, alarmas)
   └── Aplicaciones[] (fecha aplicada, % cumplimiento, criterios marcados)

Evento (EA-xxxx)
   ├── Codigo
   ├── Fecha, Ambito, Tipo, Servicio, Notificador
   ├── Descripcion, Anonimo
   ├── Estado (sin verificar / en gestión / plan de mejora / cerrado)
   ├── Gravedad (leve / moderado / grave / centinela)
   ├── Gestor (Usuario)
   ├── Verificacion (clasificación, fecha)
   ├── Causas[]
   ├── MedidasAplicables[]
   ├── ResumenFinal (texto)
   └── PlanMejora (referencia)

PlanMejora (PM-xxxx)
   ├── EventoOrigen (referencia)
   ├── FechaCreacion, FechaCierreEstimada
   ├── Creador
   ├── Actividades[] (codigo, responsable, plazo, estado, descripcion, evidencias[])
   └── Avance (calculado: completed/total)

EvaluacionNTB
   ├── Unidad
   ├── FechaEvaluacion, Evaluador
   ├── Categorias[] (Infraestructura, Equipamiento, …)
   │   └── Requisitos[] (codigo, cumple/no cumple/N/A, costoAsociado)
   ├── InversionTotal (calculado)
   └── HistorialCambios[]

Notificacion (sistema)
   ├── Usuario destino
   ├── Tipo (alarma indicador / vencimiento doc / pauta programada / evento adverso / …)
   ├── Mensaje, EnlaceAccion
   ├── Leida, FechaCreacion
   └── EmailEnviado

AlarmaConfig
   ├── Usuario (o global)
   ├── TipoAlarma (de las anteriores)
   ├── Activa (true/false)
   └── ParametrosUmbral (días anticipación, etc.)

Auditoria (audit log)
   ├── FechaHora
   ├── Usuario, Accion (CREATE/UPDATE/DELETE/READ/APPROVE/LOGIN)
   ├── EntidadTipo, EntidadId
   ├── IP, UserAgent
   └── Exitoso (boolean)
```

## 10. LO QUE TIENE QUE QUEDAR CLARO

Antes de pedirle a Claude algo, asegurate que entiende:

1. **No es un CRUD genérico.** Es un sistema regulatorio chileno con vocabulario muy específico (Manual de Acreditación, NTB, IAAS, Pautas de supervisión, etc.). Si Claude usa términos en inglés o genéricos en la UI, está mal.
2. **Cada cambio impacta un ítem del Anexo N°3.** Antes de modificar una pantalla, identifica qué ítem(s) cubre. Si rompes uno, hay que mencionarlo.
3. **Las alarmas email son críticas.** Aparecen en 4 ítems (1.2.e, 3.1.c, 3.2.b, 4.1.b). Hay una pantalla central `/configuracion` que gobierna todas. No las dispersar en otras pantallas.
4. **El "responsable" no es uno solo.** Hay titulares, suplentes, gestores, notificadores. Cada uno cumple un rol distinto. No confundirlos.
5. **Periodos importan.** Todo se evalúa por periodos (mensual, trimestral, semestral, anual). Filtrar siempre por periodo cuando aplique.
6. **La trazabilidad es obligatoria.** Cualquier cambio importante debe registrarse en audit log. Si Claude agrega una nueva acción mutativa, debe pensar en eso.
7. **Roles importan.** Hay endpoints `adminOnly`. Si Claude pone una acción crítica accesible a cualquier usuario, lo está rompiendo.
8. **Backend separado.** Si Claude crea endpoints nuevos en frontend, debe avisar que también hay que crearlos en el backend (no asumir que existen).

## 11. GLOSARIO RÁPIDO (cosas chilenas que Claude debería saber)

- **CEMSCO**: Centro Especializado de Medicina y Cirugía Comunitaria
- **CESFAM**: Centro de Salud Familiar
- **DAS**: Dirección de Salud Municipal
- **MINSAL**: Ministerio de Salud de Chile
- **IAAS**: Infecciones Asociadas a la Atención de Salud
- **EPP**: Elementos de Protección Personal
- **NTB**: Norma Técnica Básica
- **RAYEN**: software de registro clínico común en atención primaria chilena
- **TENS**: Técnico en Enfermería Nivel Superior

## 12. AUTOEVALUACIÓN ORIGINAL DEL OFERENTE

Daniel Cáceres firmó el Anexo N°3 declarando **"Cumple = X (Sí)"** en los 46 ítems. Eso es un **compromiso contractual**: el sistema *debe* hacer todo lo que ese documento dice. Si Claude detecta que algo no cumple o cumple a medias, debe levantar la alerta — no dejarlo pasar.

---

**Fecha del documento original**: Concepción, 11 de mayo de 2026
**Firma**: Daniel Abraham Isaías Cáceres Cerda · Awna Digital Spa
**Licitación**: 2421-16-LE26
