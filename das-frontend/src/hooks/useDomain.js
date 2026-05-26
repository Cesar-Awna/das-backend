import { useQuery } from '@tanstack/react-query';
import Acreditacion from '../services/Acreditacion.js';
import Ntb from '../services/Ntb.js';
import Supervision from '../services/Supervision.js';
import ImprovementPlans from '../services/ImprovementPlans.js';
import Users from '../services/Users.js';
import Organizations from '../services/Organizations.js';
import Workspace from '../services/Workspace.js';
import Search from '../services/Search.js';
import Reports from '../services/Reports.js';
import Audit from '../services/Audit.js';
import Notifications from '../services/Notifications.js';

const baseOptions = { refetchOnWindowFocus: false, retry: 1 };

// Acreditación
export const useAutoevaluacion = (id) =>
  useQuery({
    queryKey: ['autoevaluacion', id],
    queryFn: () => Acreditacion.getAutoevaluacion(id),
    enabled: !!id,
    ...baseOptions,
  });

export const useAutoevaluaciones = (params) =>
  useQuery({
    queryKey: ['autoevaluaciones', params],
    queryFn: () => Acreditacion.autoevaluaciones(params),
    ...baseOptions,
  });

// NTB
export const useNtbEvaluaciones = (params) =>
  useQuery({
    queryKey: ['ntb', 'evaluaciones', params],
    queryFn: () => Ntb.evaluaciones(params),
    ...baseOptions,
  });

export const useNtbEvaluacion = (id) =>
  useQuery({
    queryKey: ['ntb', id],
    queryFn: () => Ntb.getEvaluacion(id),
    enabled: !!id,
    ...baseOptions,
  });

export const useNtbInformeValorizado = (id) =>
  useQuery({
    queryKey: ['ntb', id, 'informe-valorizado'],
    queryFn: () => Ntb.informeValorizado(id),
    enabled: !!id,
    ...baseOptions,
  });

// Supervisión
export const useSupervisionPautas = (params) =>
  useQuery({
    queryKey: ['supervision', 'pautas', params],
    queryFn: () => Supervision.pautas(params),
    ...baseOptions,
  });

export const useSupervisionPauta = (id) =>
  useQuery({
    queryKey: ['supervision', 'pauta', id],
    queryFn: () => Supervision.getPauta(id),
    enabled: !!id,
    ...baseOptions,
  });

// Improvement plans
export const useImprovementPlan = (id) =>
  useQuery({
    queryKey: ['plan', id],
    queryFn: () => ImprovementPlans.getById(id),
    enabled: !!id,
    ...baseOptions,
  });

export const useImprovementPlans = (params) =>
  useQuery({
    queryKey: ['plans', params],
    queryFn: () => ImprovementPlans.list(params),
    ...baseOptions,
  });

// Users
export const useUsers = (params) =>
  useQuery({
    queryKey: ['users', params],
    queryFn: () => Users.list(params),
    ...baseOptions,
  });

export const useUserStats = () =>
  useQuery({
    queryKey: ['users', 'stats'],
    queryFn: () => Users.stats(),
    ...baseOptions,
  });

// Organizations
export const useOrgTree = () =>
  useQuery({
    queryKey: ['org', 'tree'],
    queryFn: () => Organizations.tree(),
    ...baseOptions,
  });

export const useOrganization = (id) =>
  useQuery({
    queryKey: ['org', id],
    queryFn: () => Organizations.getById(id),
    enabled: !!id,
    ...baseOptions,
  });

// Workspace
export const useMyTasks = () =>
  useQuery({
    queryKey: ['workspace', 'my-tasks'],
    queryFn: () => Workspace.myTasks(),
    ...baseOptions,
  });

// Search
export const useSearch = (q, filters) =>
  useQuery({
    queryKey: ['search', q, filters],
    queryFn: () => Search.global(q, filters),
    enabled: !!q && q.length >= 2,
    ...baseOptions,
  });

// Reports
export const useReports = () =>
  useQuery({
    queryKey: ['reports', 'list'],
    queryFn: () => Reports.list(),
    ...baseOptions,
  });

export const useRecentReports = () =>
  useQuery({
    queryKey: ['reports', 'recent'],
    queryFn: () => Reports.recent(),
    ...baseOptions,
  });

// Audit
export const useAuditLogs = (params) =>
  useQuery({
    queryKey: ['audit', 'logs', params],
    queryFn: () => Audit.logs(params),
    ...baseOptions,
  });

// Notifications
export const useNotifications = () =>
  useQuery({
    queryKey: ['notifications'],
    queryFn: () => Notifications.list(),
    ...baseOptions,
  });

export const useUnreadNotifications = () =>
  useQuery({
    queryKey: ['notifications', 'unread'],
    queryFn: () => Notifications.unreadCount(),
    ...baseOptions,
  });
