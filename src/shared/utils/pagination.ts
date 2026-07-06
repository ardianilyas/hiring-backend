import { z } from "zod";

export const paginationQueryDto = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export type PaginationQueryDto = z.infer<typeof paginationQueryDto>;

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    nextUrl: string | null;
    prevUrl: string | null;
  };
}

export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
  baseUrl: string,
  query: Record<string, any>
): PaginatedResult<T> {
  const totalPages = Math.ceil(total / limit);

  const createUrl = (p: number) => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && key !== "page") {
        searchParams.append(key, String(value));
      }
    }
    searchParams.append("page", String(p));
    return `${baseUrl}?${searchParams.toString()}`;
  };

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
      nextUrl: page < totalPages ? createUrl(page + 1) : null,
      prevUrl: page > 1 ? createUrl(page - 1) : null,
    },
  };
}
