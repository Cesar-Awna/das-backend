import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Events from '../services/Events.js';

export const useEvents = (params) =>
  useQuery({
    queryKey: ['events', 'list', params],
    queryFn: () => Events.list(params),
    refetchOnWindowFocus: false,
    retry: 1,
  });

export const useEvent = (id) =>
  useQuery({
    queryKey: ['events', id],
    queryFn: () => Events.getById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    retry: 1,
  });

export const useEventStats = () =>
  useQuery({
    queryKey: ['events', 'stats'],
    queryFn: () => Events.stats(),
    refetchOnWindowFocus: false,
    retry: 1,
  });

export const useEventCatalog = (kind) =>
  useQuery({
    queryKey: ['events', 'catalog', kind],
    queryFn: () => {
      const map = {
        ambitos: () => Events.ambitos(),
        tipos: () => Events.tipos(),
        medidas: () => Events.medidas(),
        formularios: () => Events.formularios(),
      };
      return map[kind]?.();
    },
    enabled: !!kind,
    refetchOnWindowFocus: false,
    retry: 1,
  });

export const useNotifyEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => Events.notify(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  });
};

export const useVerifyEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => Events.verify(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  });
};
