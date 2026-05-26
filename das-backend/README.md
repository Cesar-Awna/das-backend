# DAS Backend

Backend del **Sistema de Gestión Documental Web de Calidad** para la Dirección de Salud Municipal de Concepción (Licitación 2421-16-LE26).

## Stack

- Node.js (ES Modules)
- Express
- MongoDB + Mongoose
- JWT para autenticación
- bcrypt para hashing de contraseñas
- express-fileupload para archivos

## Estructura del proyecto

```
das-backend/
├── config/              # Configuración general
├── controllers/         # Controllers por dominio
├── libs/                # mongoose.js (conexión)
├── models/              # 18 modelos Mongoose
├── public/uploads/      # Archivos subidos
├── routes/              # Rutas por dominio
├── services/            # Lógica de negocio
├── utils/               # Middlewares y helpers
├── .env.example
├── server.js
└── package.json
```

## Instalación

```bash
npm install
cp .env.example .env
# Editar .env con tus credenciales reales
npm run dev
```

## Variables de entorno

```
MONGO_URI=mongodb+srv://...
PORT=5001
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
JWT_SECRET=tu-secret
JWT_EXPIRES_IN=8h
```

## Módulos del sistema

El sistema cubre los 5 módulos exigidos por la licitación más servicios transversales:

| Módulo | Endpoints base |
|---|---|
| Autenticación | `/api/auth` |
| Usuarios | `/api/users` |
| Organizaciones (servicios/áreas/unidades) | `/api/organizations` |
| Acreditación (Manual Superintendencia) | `/api/acreditacion` |
| Indicadores | `/api/indicators` |
| Autorización Sanitaria (NTB) | `/api/ntb` |
| Gestión Documental | `/api/documents` |
| Pautas de Supervisión | `/api/supervision-pautas` |
| Eventos Adversos | `/api/eventos` |
| Planes de Mejora | `/api/improvement-plans` |
| Notificaciones | `/api/notifications` |
| Auditoría | `/api/audit` |
| Workspace (herramientas transversales) | `/api/workspace` |
| Reportes | `/api/reports` |

## Modelos MongoDB (18)

1. `users` - Usuarios (administradores y usuarios)
2. `organizations` - Servicios, áreas, unidades
3. `acreditacion_pautas` - Pautas del Manual de Acreditación
4. `acreditacion_autoevaluaciones` - Autoevaluaciones (cumple/no cumple/no aplica)
5. `indicators` - Indicadores de acreditación
6. `indicator_measurements` - Mediciones con respaldos
7. `ntb_pautas` - Normas Técnicas Básicas
8. `ntb_evaluaciones` - Evaluaciones NTB con valorización
9. `documents` - Documentos con versiones
10. `supervision_pautas` - Pautas de supervisión
11. `supervision_aplicaciones` - Aplicaciones de pautas
12. `event_catalogs` - Catálogos (ámbitos, tipos, medidas)
13. `event_forms` - Formularios configurables
14. `adverse_events` - Eventos adversos
15. `improvement_plans` - Planes de mejora
16. `notifications` - Notificaciones in-app y email
17. `audit_logs` - Auditoría de cambios
18. `files` - Archivos centralizados

## Flujo de arquitectura

Route → Controller → Service → Model

Todos los servicios llaman a `connectMongoDB()` en el constructor y devuelven respuestas con la forma:

```javascript
{ success: boolean, message: string, data?: any }
```

## Próximos pasos

- Implementar generación real de PDFs (pdfkit / puppeteer)
- Implementar envío de emails (nodemailer)
- Implementar cron jobs para alarmas de vencimiento
- Implementar sistema de auditoría automática (middleware)
- Tests unitarios e integración
