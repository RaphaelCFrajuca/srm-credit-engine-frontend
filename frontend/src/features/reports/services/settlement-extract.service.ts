import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import type {
  SettlementExtractQuery,
  SettlementExtractResponse,
} from "../../../types/api";

const normalizeExtractResponse = (
  raw: unknown,
  page: number,
  pageSize: number,
): SettlementExtractResponse => {
  if (typeof raw === "object" && raw && "data" in raw) {
    const response = raw as SettlementExtractResponse;
    return {
      data: response.data ?? [],
      page: response.page ?? page,
      pageSize: response.pageSize ?? pageSize,
      totalItems: response.total ?? 0,
      totalPages: response.totalPages ?? 0,
    };
  }

  if (Array.isArray(raw)) {
    return {
      data: raw,
      page,
      pageSize,
      totalItems: raw.length,
      totalPages: 1,
    } as SettlementExtractResponse;
  }

  return {
    data: [],
    page,
    pageSize,
    totalItems: 0,
    totalPages: 0,
  };
};

export const useSettlementExtract = (query: SettlementExtractQuery) =>
  useQuery({
    queryKey: ["settlements", "extract", query],
    queryFn: async () => {
      const { data } = await api.get("/settlements/extract", { params: query });
      return normalizeExtractResponse(
        data,
        query.page ?? 1,
        query.pageSize ?? 10,
      );
    },
  });
