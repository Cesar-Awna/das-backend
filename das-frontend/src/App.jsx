import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.jsx';

// Public
import Login from './pages/public/Login.jsx';

// Private
import Dashboard from './pages/private/Dashboard.jsx';
import Workspace from './pages/private/Workspace.jsx';
import Acreditacion from './pages/private/Acreditacion.jsx';
import IndicadorDetalle from './pages/private/IndicadorDetalle.jsx';
import Autoevaluacion from './pages/private/Autoevaluacion.jsx';
import Comparativa from './pages/private/Comparativa.jsx';
import AutorizacionSanitaria from './pages/private/AutorizacionSanitaria.jsx';
import Documental from './pages/private/Documental.jsx';
import Supervision from './pages/private/Supervision.jsx';
import Eventos from './pages/private/Eventos.jsx';
import EventoDetalle from './pages/private/EventoDetalle.jsx';
import PlanMejora from './pages/private/PlanMejora.jsx';
import CatalogosEventos from './pages/private/CatalogosEventos.jsx';
import FormulariosEventos from './pages/private/FormulariosEventos.jsx';
import Busqueda from './pages/private/Busqueda.jsx';
import CalculoMuestral from './pages/private/CalculoMuestral.jsx';
import Reportes from './pages/private/Reportes.jsx';
import Usuarios from './pages/private/Usuarios.jsx';
import Organizacion from './pages/private/Organizacion.jsx';
import Configuracion from './pages/private/Configuracion.jsx';
import Auditoria from './pages/private/Auditoria.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mi-dia" element={<Workspace />} />

          <Route path="/acreditacion" element={<Acreditacion />} />
          <Route path="/indicadores/:id" element={<IndicadorDetalle />} />
          <Route path="/autoevaluacion" element={<Autoevaluacion />} />
          <Route path="/comparativa" element={<Comparativa />} />

          <Route path="/autorizacion-sanitaria" element={<AutorizacionSanitaria />} />
          <Route path="/documental" element={<Documental />} />
          <Route path="/supervision" element={<Supervision />} />

          <Route path="/eventos" element={<Eventos />} />
          <Route path="/eventos/:id" element={<EventoDetalle />} />
          <Route path="/plan-mejora/:id" element={<PlanMejora />} />
          <Route path="/catalogos-eventos" element={<CatalogosEventos />} />
          <Route path="/formularios-eventos" element={<FormulariosEventos />} />

          <Route path="/busqueda" element={<Busqueda />} />
          <Route path="/calculo-muestral" element={<CalculoMuestral />} />
          <Route path="/reportes" element={<Reportes />} />

          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/organizacion" element={<Organizacion />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="/auditoria" element={<Auditoria />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
