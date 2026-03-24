type VacancyRecord = Record<string, any>;

type VacancyCollection<T = VacancyRecord> = {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
};

export const createEmptyVacanciesCollection = <T = VacancyRecord>(): VacancyCollection<T> => ({
  data: [],
  current_page: 1,
  last_page: 1,
  total: 0,
  per_page: 0,
});

export const normalizeVacanciesCollection = <T = VacancyRecord>(response: any): VacancyCollection<T> => {
  const normalizedSource = response?.data && !Array.isArray(response.data) && Array.isArray(response.data?.data)
    ? response.data
    : response;

  const items = Array.isArray(normalizedSource?.data)
    ? normalizedSource.data
    : Array.isArray(response)
      ? response
      : [];

  return {
    data: items,
    current_page: Number(normalizedSource?.current_page || 1),
    last_page: Number(normalizedSource?.last_page || 1),
    total: Number(normalizedSource?.total || items.length),
    per_page: Number(normalizedSource?.per_page || items.length || 0),
  };
};

export const fetchAllVacancies = async <T = VacancyRecord>(
  apiBase: string,
  options: {
    maxPages?: number;
    timeout?: number;
  } = {},
): Promise<VacancyCollection<T>> => {
  const normalizedBase = String(apiBase || 'http://localhost:8000').replace(/\/+$/, '');
  const maxPages = Math.max(options.maxPages || 10, 1);
  const timeout = options.timeout || 20000;

  let page = 1;
  let lastPage = 1;
  let total = 0;
  const allItems: T[] = [];

  while (page <= lastPage && page <= maxPages) {
    // The vacancies endpoint currently hangs when per_page/include_expired are supplied,
    // so fetch by page only and paginate/filter in the frontend.
    const response = await $fetch(`${normalizedBase}/api/vacancies`, {
      query: { page },
      timeout,
    });

    const normalized = normalizeVacanciesCollection<T>(response);
    const items = Array.isArray(normalized.data) ? normalized.data : [];

    allItems.push(...items);
    total = Math.max(total, normalized.total || items.length);
    lastPage = Math.max(normalized.last_page || 1, 1);

    if (!items.length || normalized.current_page >= lastPage) {
      break;
    }

    page += 1;
  }

  return {
    data: allItems,
    current_page: 1,
    last_page: Math.max(lastPage, 1),
    total: total || allItems.length,
    per_page: allItems.length,
  };
};
