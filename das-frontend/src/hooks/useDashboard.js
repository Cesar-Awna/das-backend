import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Dashboard from '../services/Dashboard.js';

export const useDashboardSummary = () =>
  useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: () => Dashboard.summary(),
    refetchOnWindowFocus: false,
    retry: 1,
  });

export const useDashboardActivity = () =>
  useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: () => Dashboard.activity(),
    refetchOnWindowFocus: false,
    retry: 1,
  });

export { useQueryClient, useMutation };
