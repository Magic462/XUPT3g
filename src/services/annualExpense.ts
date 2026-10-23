import { del, get, put } from '@/utils/request/http';
import type { AnnualExpenseReport } from '@/types/annualExpense';

const endpoint = '/xupt-web/api/annual-expense';

export function getAnnualExpense(year: number, signal?: AbortSignal) {
  return get<AnnualExpenseReport>(endpoint, {
    params: { year },
    signal,
    customAuth: true,
  });
}

export function saveAnnualExpense(year: number, content: string) {
  return put<AnnualExpenseReport>(
    endpoint,
    { year, content },
    { customAuth: true }
  );
}

export function deleteAnnualExpense(year: number) {
  return del<null>(endpoint, { params: { year }, customAuth: true });
}
