import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Documents from '../services/Documents.js';

export const useDocuments = (params) =>
  useQuery({
    queryKey: ['documents', 'list', params],
    queryFn: () => Documents.list(params),
    refetchOnWindowFocus: false,
    retry: 1,
  });

export const useDocument = (id) =>
  useQuery({
    queryKey: ['documents', id],
    queryFn: () => Documents.getById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    retry: 1,
  });

export const useDocumentVersions = (id) =>
  useQuery({
    queryKey: ['documents', id, 'versions'],
    queryFn: () => Documents.versions(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    retry: 1,
  });

export const useDocumentsByPeriod = (period) =>
  useQuery({
    queryKey: ['documents', 'period', period],
    queryFn: () => Documents.byPeriod(period),
    enabled: !!period,
    refetchOnWindowFocus: false,
    retry: 1,
  });

export const useApproveDocument = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => Documents.approve(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['documents'] }),
  });
};
