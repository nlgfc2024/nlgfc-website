interface LAReport {
  id: number;
  title: string;
  type: string;
  period: string;
  file?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface UseLAReportsOptions {
  perPage?: number;
  localAuthorityId?: number | string;
  type?: string;
  period?: string;
}

export const useLAReports = (options: UseLAReportsOptions = {}) => {
  const query = new URLSearchParams();

  if (options.perPage) query.set('per_page', String(options.perPage));
  if (options.localAuthorityId) query.set('local_authority_id', String(options.localAuthorityId));
  if (options.type) query.set('type', options.type);
  if (options.period) query.set('period', options.period);

  const queryString = query.toString();
  const endpoint = queryString ? `/api/la-reports?${queryString}` : '/api/la-reports';
  const key = queryString ? `la-reports-${queryString}` : 'la-reports';

  return useApiData<LAReport[]>(
    key,
    endpoint,
    {
      default: () => [],
      transform: (response: any) => {
        if (Array.isArray(response)) return response;
        if (Array.isArray(response?.data)) return response.data;
        return [];
      }
    }
  );
};

export const useLAReportDownloadUrl = () => {
  const baseUrl = useApiBase();

  return (reportId: number | string) => `${baseUrl}/api/la-reports/${reportId}/download`;
};
